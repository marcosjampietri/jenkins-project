import product from "../models/prodModel";

export const getAllProd = (req: any, res: any) => {
  product.find({}, (err, product) => {
    res.header("Access-Control-Allow-Origin", "*"); //CORS
    res.json(product);
  });
};

export const payIntent = async (req: any, res: any) => {
  const secretKey: string | undefined = <string | undefined>(
    process.env.STRIPE_SECRET_KEY
  );

  const stripe = require("stripe")(secretKey);

  const { amount } = req.body;
  try {
    // Psst. For production-ready applications we recommend not using the
    // amount directly from the client without verifying it first. This is to
    // prevent bad actors from changing the total amount on the client before
    // it gets sent to the server. A good approach is to send the quantity of
    // a uniquely identifiable product and calculate the total price server-side.
    // Then, you would only fulfill orders using the quantity you charged for.

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "gbp",
    });

    res.status(200).send(paymentIntent.client_secret);
    // ====== //
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
