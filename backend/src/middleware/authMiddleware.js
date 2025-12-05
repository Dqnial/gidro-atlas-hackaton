import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // берём токен из cookie
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id + role
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
