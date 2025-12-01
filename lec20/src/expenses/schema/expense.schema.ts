import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema()
export class Expenses {

    @Prop({
        type: String,
        required: true
    })
    category: string

    @Prop({
        type: Number,
        required: true
    })
    amount: number


    @Prop({
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    })
    user: mongoose.Types.ObjectId
}

export const expenseModel = SchemaFactory.createForClass(Expenses)