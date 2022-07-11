import { Router } from "express";
import validateUser from "../middlewares/validateUser.js";
import { regiterPurchase } from "../controllers/purchaseControllers.js";

const router = Router();

router.post("/purchases", validateUser, regiterPurchase);

export default router;