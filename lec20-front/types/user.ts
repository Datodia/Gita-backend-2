import { Expense } from "./expense";

export type User = {
    age: number;
    createdAt: string;
    email: string;
    expenses: Omit<Expense, 'user'>[]
    fullName: string;
    updatedAt: string;
    profilePic: string
    __v: number;
    _id: string;
}
