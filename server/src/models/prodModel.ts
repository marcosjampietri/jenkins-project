import { model, Schema, Model, Document } from "mongoose";

interface product extends Document {
    title: string;
    description: string;
    price: number;
    image: string;
}

const ProdSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

const product: Model<product> = model("product", ProdSchema);

export default product;
