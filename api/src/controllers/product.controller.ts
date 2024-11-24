import { createProduct } from '@factories/product.factory';
import { ProductRepository } from '@repositories/product.repository';
import { Request, Response, NextFunction } from 'express';
import { io } from '../index';

const repository = new ProductRepository();

export class ProductController {
  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await repository.findAll();
      res.json(products);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = await repository.findById(req.params.id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product = createProduct(req.body);
      const created = await repository.create(product);

      io.emit('productAdded', created);

      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const updated = await repository.update(req.params.id, req.body);
      if (!updated) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      io.emit('productUpdated', updated);

      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const deleted = await repository.delete(req.params.id);
      if (!deleted) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      io.emit('productDeleted', req.params.id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  };
}
