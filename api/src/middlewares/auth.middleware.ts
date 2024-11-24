import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWTSECRET || 'your_secret_key';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
        return;
    }
};
