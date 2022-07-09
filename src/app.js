import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductsRouter from "./routes/productsRouter.js";
import authRouter from './routes/authRouter.js';
import CartRouter from "./routes/cartRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(ProductsRouter);
app.use(authRouter);
app.use(CartRouter);

app.listen(process.env.PORT, () => {
  console.log("rodando servidor...");
});