import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.listen(process.env.PORT, () => {
  console.log("rodando servidor...");
});