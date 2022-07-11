import { db, objectId } from "../databases/mongodb.js";
import joi from "joi";

export async function regiterPurchase(req, res) {
  const { userId } = res.locals.session;
  const purchaseData = req.body;

  const purchaseSchema = joi.object(
    {
      totalPrice: joi.number().required(),
      products: joi.array().required(),
      paymentMethod: joi.string().required(),
    }
  )

  const { error } = purchaseSchema.validate(purchaseData);

  if(error) {
    console.log(error.details);
    return res.sendStatus(422);
  }

  try {
    const updateCart = await removeFromCard(userId, purchaseData.products);

    if(!updateCart) {
      return res.sendStatus(500);
    }

    await db.collection("purchases").insertOne({ ...purchaseData, userId });
    res.sendStatus(201);
  } catch(err) {
    res.sendStatus(500);
  }
}

async function removeFromCard(userId, products) {
  try{
    const cart = await db.collection("carts").findOne({ userId });

    const cartProducts = [];

    for(let i = 0; i < cart.products.length; i++) {
      const isInPurchase = products.find( product => product._id === cart.products[i]._id );

      if(!isInPurchase) {
        cartProducts.push(cart.products[i]);
      }
    }

    if(cartProducts.length === 0) {
      await db.collection("carts").deleteOne({ userId });
    } else {
      await db.collection("carts").updateOne(
        {
          userId
        },
        {
          $set: { products: cartProducts }
        }
      )
    }

    return true;

  } catch(err) {
    console.log(err);
    return false;
  }
}