import axios from 'axios';
import { Product } from '../entities/Product';
import { API_BASE_URL } from '../utils/config';

/**
 * Fetch all products from the API.
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

/**
 * Fetch a single product by ID from the API.
 */
export async function getProductById(id: string): Promise<Product> {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        throw error;
    }
}

/**
 * Create a new product.
 */
export async function createProduct(product: Omit<Product, '_id'>): Promise<Product> {
    try {
        const response = await axios.post(`${API_BASE_URL}/products`, product);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

/**
 * Update an existing product.
 */
export async function editProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
        const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
        return response.data;
    } catch (error) {
        console.error(`Error updating product with ID ${id}:`, error);
        throw error;
    }
}

/**
 * Delete a product by ID.
 */
export async function deleteProduct(id: string): Promise<boolean> {
    try {
        const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
    }
}