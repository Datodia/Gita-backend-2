import mongoose from "mongoose";
import { Role } from "src/enum/role.enum";
export declare class User {
    fullName: string;
    email: string;
    password: string;
    age: number;
    expenses: mongoose.Types.ObjectId[];
    role: Role;
    isMerried: Boolean;
    isVerfied: boolean;
    OTPCode: string;
    OTPCodeExpirationDate: string;
    profilePic: string;
}
export declare const userModel: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User, any, {}> & User & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
