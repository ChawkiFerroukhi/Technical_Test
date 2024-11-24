import { Product } from '../entities/Product';
import apiClient from './ApiClient';

/**
 * Fetch all products from the API.
 */
export async function getProducts(): Promise<Product[]> {
    try {
        const response = await apiClient.get('/products');
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
        const response = await apiClient.get(`/products/${id}`);
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
        const response = await apiClient.post(`/products`, product);
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
        const response = await apiClient.put(`/products/${id}`, product);
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
        const response = await apiClient.delete(`/products/${id}`);
        if (response.status === 204) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        throw error;
    }
}