import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
    telegramID: number;
    firstname: string;
    username: string;
    createdAt: Date
};

const userSchema = new Schema<IUser>({
    telegramID: {
        type: Number,
        required: [true, 'Telegram ID is required'],
        unique: true
    },
    firstname: String,
    username: String,
}, {
    timestamps: true
});

export const User = model<IUser>('User', userSchema);