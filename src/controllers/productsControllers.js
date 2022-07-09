import { db } from "../databases/mongodb.js";

export async function getProducts(req, res) {
  try {
    const products = await db.collection("products").find().toArray();

    res.status(200).send(products);
  } catch(err) {
    res.sendStatus(500);
  }
}