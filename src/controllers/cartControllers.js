import { db, objectId } from "../databases/mongodb.js";

export async function addCart(req, res){
  const { userId } = res.locals.session;
  const { product: newProduct } = req.body;

  try {
    const regiteredCart = await db.collection("carts").findOne({ userId });
  
    if(regiteredCart) {
      const productAlredyAdded = regiteredCart.products.find( product => product._id === newProduct._id );

      if(productAlredyAdded) {
        return res.status(409).send("O produto já está no carrinho");
      }

      const updatedProducts = [ ...regiteredCart.products, newProduct ];
      const updatedTotalPrice = parseFloat(regiteredCart.totalPrice) + parseFloat(newProduct.price);

      await db.collection("carts").updateOne(
        {
          userId
        },
        {
          $set: { products: updatedProducts, totalPrice:updatedTotalPrice }
        }
      );

      res.sendStatus(201);
    } else {
      const newCart = {
        userId,
        products: [newProduct],
        totalPrice: parseFloat(newProduct.price)
      };

      await db.collection("carts").insertOne( newCart );

      res.sendStatus(201);
    }
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}