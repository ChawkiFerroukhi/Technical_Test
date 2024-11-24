import { UserModel } from '@models/user.model';
import { User } from '@entities/user.entity'
import bcrypt from 'bcryptjs';

export const UserRepository = {
    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({ email }).exec();
    },

    async create(user: User): Promise<User> {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new UserModel({
            ...user,
            password: hashedPassword,
        });
        
        await newUser.save();
        return newUser;
    },

    async deleteAll(): Promise<void> {
        await UserModel.deleteMany({});
    },
};
