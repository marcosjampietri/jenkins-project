import express from "express";
import { getAllProd, payIntent } from "../controllers/prodController";

const router = express.Router();
//CV-EDU
router.get("/products", getAllProd);
router.post("/payment_intents", payIntent);
// app.route("/api/products/:prodId").get(getEdu);
// app.route("/api/payment_intents").post(payIntent);

export default router;
