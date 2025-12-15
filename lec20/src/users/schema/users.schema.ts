import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Role } from "src/enum/role.enum";

@Schema({
    _id: false
})
class Address {
    @Prop({
        type: String,
        required: true
    })
    home: string

    @Prop({
        type: String,
        required: true
    })
    work: string
}
const addressSchema = SchemaFactory.createForClass(Address)

@Schema({
    timestamps: true
})
export class User {
    @Prop({
        type: String,
        required: true,
    })
    fullName: string

    @Prop({
        type: String,
        required: true,
    })
    email: string

    @Prop({
        type: String,
        required: true,
        select: false
    })
    password: string
        
    @Prop({
        type: Number,
        required: true,
        index: true
    })
    age: number
    
    @Prop({
        type: [mongoose.Types.ObjectId],
        ref: "expense",
        default: []
    })
    expenses: mongoose.Types.ObjectId[]

    @Prop({
        type: String,
        enum: Role,
        default: Role.VIEWER
    })
    role: Role

    @Prop({
        type: Boolean,
    })
    isMerried: Boolean
}

export const userModel = SchemaFactory.createForClass(User)