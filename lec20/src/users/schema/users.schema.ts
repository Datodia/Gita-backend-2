import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({
    timestamps: true
})
export class User {
    @Prop({
        type: String,
        required: true,
        lowercase: true
    })
    fullName: string

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        unique: true
    })
    email: string

    @Prop({
        type: Number,
        required: true
    })
    age: number

    @Prop({
        type: [mongoose.Types.ObjectId],
        ref: "expense",
        default: []
    })
    expenses: mongoose.Types.ObjectId[]
}

export const userModel = SchemaFactory.createForClass(User)