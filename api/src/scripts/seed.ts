import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { Product } from '@entities/product.entity';
import { ProductRepository } from '@repositories/product.repository';
import connectDb from '../config/db';
import { createProduct } from '@factories/product.factory';

dotenv.config();

const loadSeedData = (): Product[] => {
    try {
        const dataPath = path.join(new URL(import.meta.url).pathname, '../../data/data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Error reading seed data file:", error);
        throw new Error("Failed to load seed data");
    }
};

const seedData = async () => {
    await connectDb();
    const productRepository = new ProductRepository();
    const products = loadSeedData();

    try {
        console.log('Clearing current data...');
        await productRepository.deleteAll();

        console.log('Seeding data...');
        for (const productData of products) {
            const product = createProduct(productData);
            await productRepository.create(product);
        }
        console.log('Seeding complete.');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};

seedData();
