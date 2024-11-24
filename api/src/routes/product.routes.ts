import express from 'express';
import { ProductController } from '../controllers/product.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();
const controller = new ProductController();

router.use((req, res, next) => isAuthenticated(req, res, next));

router.get('/products', controller.getAll);
router.get('/products/:id', controller.getById);
router.post('/products', controller.create);
router.put('/products/:id', controller.update);
router.delete('/products/:id', controller.delete);

export default router;