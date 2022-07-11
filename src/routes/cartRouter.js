import { Router } from "express";
import ValidateUser from "../middlewares/validateUser.js";
import { addCart, getCart, getCartProducts } from "../controllers/cartControllers.js";

const router = Router();

router.post("/carts", ValidateUser, addCart);
router.get("/carts", ValidateUser, getCart);
router.post("/cartProducts", ValidateUser, getCartProducts);

export default router;