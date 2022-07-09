import { Router } from "express";
import ValidateUser from "../middlewares/validateUser.js";
import { addCart } from "../controllers/cartControllers.js";

const router = Router();

router.post("/carts", ValidateUser, addCart);

export default router;