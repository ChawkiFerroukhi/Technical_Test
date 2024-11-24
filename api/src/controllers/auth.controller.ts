import { AuthService } from '@auth/auth.service';
import { Request, Response } from 'express';

export class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }

        try {
            const token = await AuthService.login(email, password);
            if (!token) {
                res.status(401).json({ message: 'Invalid email or password.' });
                return;
            }
            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error.', error });
        }
    }
}
