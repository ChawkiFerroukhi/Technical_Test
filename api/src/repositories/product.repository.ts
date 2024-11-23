import { Product } from "@entities/product.entity";
import { ProductModel } from "@models/product.model";


export class ProductRepository {
  async create(product: Product): Promise<Product> {
    const created = await ProductModel.create(product);
    return created.toObject()
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id).lean();
    return product;
  }

  async findAll(): Promise<Product[]> {
    return ProductModel.find().lean();
  }

  async update(id: string, updates: Partial<Product>): Promise<Product | null> {
    const updated = await ProductModel.findByIdAndUpdate(id, updates, { new: true }).lean();
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }

  async deleteAll(): Promise<void> {
    await ProductModel.deleteMany();
  }
}
