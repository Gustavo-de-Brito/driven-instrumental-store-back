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

export async function getCart(req, res){
  const { userId } = res.locals.session;

  try{
    const regiteredCart = await db.collection("carts").findOne({ userId });

    if (!regiteredCart) {
      res.sendStatus(404);
      return;
    }
  
    res.status(200).send(regiteredCart);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getCartProducts(req, res){
  const { cartProducts } = req.body;
  //console.log(cartProducts);
  const cartProductsIds = [];


  try{
  cartProducts.forEach(function(item){
    cartProductsIds.push(item._id);
  });

  //const cartProducts = ["62cb3ecef34d66b1eb098bd9", "62cb3ff0f34d66b1eb098bdb"];
  var cartProductsObjectId = [];
  cartProductsIds.forEach(function(item){ 
    cartProductsObjectId.push(new objectId(item));
  });

  const products = await db.collection("products").find({_id: {$in: cartProductsObjectId}}).toArray();

  if(!products){
    res.status(404).send("Produtos do carrinho não encontrados");
    return;
  }

  res.status(200).send(products);
    
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
}