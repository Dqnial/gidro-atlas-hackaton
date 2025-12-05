import express from "express";
import { register, login, logout, me } from "../controllers/authController.js";
import { auth } from "../middleware/authMiddleware.js";
import { permit } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);
router.post("/logout", logout);

// пример защищённого роута
router.get("/secret", auth, permit("expert"), (req, res) => {
  res.json({ message: "Hello EXPERT" });
});

export default router;
