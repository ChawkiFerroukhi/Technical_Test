import { ProductController } from '@controllers/product.controller';
import { Product } from '@entities/product.entity';
import { createProduct } from '@factories/product.factory';
import { ProductRepository } from '@repositories/product.repository';
import { Request, Response } from 'express';


jest.mock('../../../repositories/product.repository');

const mockProductRepository = ProductRepository as jest.MockedClass<typeof ProductRepository>;
describe('ProductController', () => {
    let productController: ProductController;
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        productController = new ProductController();
        mockReq = {};
        mockRes = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            sendStatus: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe('getAll', () => {
        it('should return a list of products', async () => {
            const mockProducts: Product[] = [
                createProduct({
                    name: 'Product 1',
                    type: 'Type A',
                    price: 100,
                    rating: 4.5,
                    warrantyYears: 2,
                    available: true,
                }),
                createProduct({
                    name: 'Product 2',
                    type: 'Type B',
                    price: 200,
                    rating: 4.8,
                    warrantyYears: 3,
                    available: true,
                }),
            ];

            mockProductRepository.prototype.findAll.mockResolvedValue(mockProducts);

            await productController.getAll(mockReq as Request, mockRes as Response, mockNext);

            expect(mockProductRepository.prototype.findAll).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            mockProductRepository.prototype.findAll.mockRejectedValue(error);

            await productController.getAll(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getById', () => {
        it('should return a product by id', async () => {
            const mockProduct: Product = createProduct({
                name: 'Product 1',
                type: 'Type A',
                price: 100,
                rating: 4.5,
                warrantyYears: 2,
                available: true,
            });

            mockReq.params = { id: '1' };

            mockProductRepository.prototype.findById.mockResolvedValue(mockProduct);

            await productController.getById(mockReq as Request, mockRes as Response, mockNext);

            expect(mockProductRepository.prototype.findById).toHaveBeenCalledWith('1');
            expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
        });

        it('should return 404 if product not found', async () => {
            mockReq.params = { id: '999' };

            mockProductRepository.prototype.findById.mockResolvedValue(null);

            await productController.getById(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Product not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            mockProductRepository.prototype.findById.mockRejectedValue(error);

            mockReq.params = { id: '1' };

            await productController.getById(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('create', () => {
        it('should create a new product', async () => {
            const newProduct: Product = createProduct({
                name: 'Product 3',
                type: 'Type C',
                price: 300,
                rating: 4.9,
                warrantyYears: 1,
                available: true,
            });

            mockReq.body = newProduct;

            mockProductRepository.prototype.create.mockResolvedValue(newProduct);

            await productController.create(mockReq as Request, mockRes as Response, mockNext);

            expect(mockProductRepository.prototype.create).toHaveBeenCalledWith(newProduct);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(newProduct);
        });

        it('should handle errors during creation', async () => {
            const error = new Error('Invalid product data');
            mockProductRepository.prototype.create.mockRejectedValue(error);

            mockReq.body = {};

            await productController.create(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });

    });

    describe('update', () => {
        it('should update a product', async () => {
            const updatedProduct: Product = createProduct({
                name: 'Updated Product',
                type: 'Type A',
                price: 150,
                rating: 4.6,
                warrantyYears: 2,
                available: true,
            });

            mockReq.params = { id: '1' };
            mockReq.body = updatedProduct;

            mockProductRepository.prototype.update.mockResolvedValue(updatedProduct);

            await productController.update(mockReq as Request, mockRes as Response, mockNext);

            expect(mockProductRepository.prototype.update).toHaveBeenCalledWith('1', updatedProduct);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith(updatedProduct);
        });

        it('should return 404 if product not found', async () => {
            const updatedProduct: Product = createProduct({
                name: 'Updated Product',
                type: 'Type A',
                price: 150,
                rating: 4.6,
                warrantyYears: 2,
                available: true,
            });

            mockReq.params = { id: '999' };
            mockReq.body = updatedProduct;

            mockProductRepository.prototype.update.mockResolvedValue(null);

            await productController.update(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Product not found' });
        });
    });

    describe('delete', () => {
        it('should delete a product successfully', async () => {
            mockProductRepository.prototype.delete.mockResolvedValue(true);

            mockReq.params = { id: '1' };

            await productController.delete(mockReq as Request, mockRes as Response, mockNext);

            expect(mockProductRepository.prototype.delete).toHaveBeenCalledWith('1');
            expect(mockRes.sendStatus).toHaveBeenCalledWith(204);
        });

        it('should return 404 if product not found', async () => {
            mockProductRepository.prototype.delete.mockResolvedValue(false);

            mockReq.params = { id: '999' };

            await productController.delete(mockReq as Request, mockRes as Response, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(404);
            expect(mockRes.json).toHaveBeenCalledWith({ error: 'Product not found' });
        });

        it('should handle errors during deletion', async () => {
            const error = new Error('Database error');
            mockProductRepository.prototype.delete.mockRejectedValue(error);

            mockReq.params = { id: '1' };

            await productController.delete(mockReq as Request, mockRes as Response, mockNext);

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});