import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema({timestamps: true})
export class Post {

    @Prop({type: String, required: true})
    title: string

    @Prop({type: String, required: true})
    desc: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users'})
    author: mongoose.Schema.Types.ObjectId
}

export const postSchema = SchemaFactory.createForClass(Post)