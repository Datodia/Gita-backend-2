import { User } from "./user";

export type Expense = {
    amount: number;
    category: string;
    user: Pick<User, 'fullName' | 'email' | '_id' | 'age'>
    updatedAt: string;
    __v: number;
    _id: string;
}