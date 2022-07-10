import { Router } from "express";
import { getProducts, registerProduct } from "../controllers/productsControllers.js";

const router = Router();

router.get("/products", getProducts);
router.post("/products", registerProduct);

export default router;