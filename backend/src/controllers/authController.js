import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_EXPIRES = 7 * 24 * 60 * 60 * 1000; // 7 дней - время жизни токена

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashed,
      role,
    });

    res.json({
      message: "Вы успешно зарегистрировались",
      user: { email: user.email, role: user.role },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Not found" });

    const isPassValid = await bcrypt.compare(password, user.password);
    if (!isPassValid)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Устанавливаем cookie с JWT
    res.cookie("jwt", token, {
      httpOnly: true, // недоступно из JS на фронте
      secure: process.env.NODE_ENV === "production", // только HTTPS
      maxAge: JWT_EXPIRES,
      sameSite: "strict",
    });

    res.json({ message: "Вы успешно вошли в аккаунт", role: user.role });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const me = async (req, res) => {
  try {
    const userId = req.user.id; // из JWT
    const user = await User.findById(userId).select("_id email role"); // выбираем только нужные поля
    if (!user)
      return res.status(404).json({ message: "Пользователь не найден" });

    res.json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0, httpOnly: true });
    res.status(200).json({ message: "Вы успешно вышли из аккаунта" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
