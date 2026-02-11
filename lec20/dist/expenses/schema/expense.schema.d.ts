import mongoose from "mongoose";
export declare class Expenses {
    category: string;
    amount: number;
    user: mongoose.Types.ObjectId;
}
export declare const expenseModel: mongoose.Schema<Expenses, mongoose.Model<Expenses, any, any, any, mongoose.Document<unknown, any, Expenses, any, {}> & Expenses & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Expenses, mongoose.Document<unknown, {}, mongoose.FlatRecord<Expenses>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Expenses> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
