import mongoose, { Schema, Document, Model } from 'mongoose';
import { Product } from '../entities';

interface ProductDocument extends Product, Document {}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    warrantyYears: { type: Number, required: true },
    available: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const ProductModel: Model<ProductDocument> = mongoose.model<ProductDocument>('Product', ProductSchema);

export { ProductModel };
