import * as dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { Product } from '@entities/product.entity';
import { ProductRepository } from '@repositories/product.repository';
import { UserRepository } from '@repositories/user.repository';
import connectDb from '../config/db';
import { createProduct } from '@factories/product.factory';
import { User } from '@entities/user.entity';

dotenv.config();

interface SeedData {
    products: Product[];
    users: User[];
}

const loadSeedData = (): SeedData => {
    try {
        const dataPath = path.join(new URL(import.meta.url).pathname, '../../data/data.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error('Error reading seed data file:', error);
        throw new Error('Failed to load seed data');
    }
};

const seedData = async () => {
    await connectDb();

    const productRepository = new ProductRepository();
    const { products, users } = loadSeedData();

    try {
        console.log('Clearing current data...');
        await productRepository.deleteAll();
        await UserRepository.deleteAll();

        console.log('Seeding products...');
        for (const productData of products) {
            const product = createProduct(productData);
            await productRepository.create(product);
        }

        console.log('Seeding users...');
        for (const userData of users) {
            await UserRepository.create(userData);
        }

        console.log('Seeding complete.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();