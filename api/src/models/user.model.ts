import { User } from '@entities/user.entity';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', UserSchema);

export { UserModel };
