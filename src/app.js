import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductsRouter from "./routes/productsRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.use(ProductsRouter);

app.listen(process.env.PORT, () => {
  console.log("rodando servidor...");
});