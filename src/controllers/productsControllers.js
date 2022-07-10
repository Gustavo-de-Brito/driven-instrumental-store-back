import { db } from "../databases/mongodb.js";



export async function getProducts(req, res) {
  try {
    const products = await db.collection("products").find().toArray();

    res.status(200).send(products);
  } catch(err) {
    res.sendStatus(500);
  }
}

export async function registerProduct(req, res) {
  const newProduct = req.body;

  await db.collection('products').insertOne(newProduct);
  res.status(201).send('Produto registrado com sucesso!');
}

