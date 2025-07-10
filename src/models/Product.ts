import { Document, model, Schema } from "mongoose";

export interface IProduct extends Document {
    id: number;
    name: string;
    description: string;
    price: number;
};

const productSchema = new Schema<IProduct>({
    id: { type: Number, unique: true, required: true },
    name: String,
    description: String,
    price: Number,
});

export const Product = model<IProduct>('Product', productSchema);