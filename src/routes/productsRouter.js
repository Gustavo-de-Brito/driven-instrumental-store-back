import { Router } from "express";
import { getProducts } from "../controllers/productsControllers.js";

const router = Router();

router.get("/products", getProducts);

export default router;