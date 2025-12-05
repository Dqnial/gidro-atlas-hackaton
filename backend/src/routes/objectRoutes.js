import express from "express";
import {
  getObjects,
  getObjectById,
  getPriority,
} from "../controllers/objectController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", auth, getObjects);
router.get("/:id", auth, getObjectById);
router.get("/:id/priority", auth, getPriority);

export default router;
