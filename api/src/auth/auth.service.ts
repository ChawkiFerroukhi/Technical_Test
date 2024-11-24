import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserRepository } from '@repositories/user.repository';

const SECRET_KEY = process.env.JWTSECRET || 'your_secret_key';

export const AuthService = {
    async login(email: string, password: string): Promise<string | null> {
        const user = await UserRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        return jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    },

    verifyToken(token: string): string | jwt.JwtPayload {
        return jwt.verify(token, SECRET_KEY);
    },
};
