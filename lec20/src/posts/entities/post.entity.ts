import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Post {
    @Prop({
        type: String,
        index: true
    })
    title: string

    @Prop({
        type: String
    })
    desc: string


    @Prop({
        type: Number,
        index: true
    })
    number: number
}


export const postModel = SchemaFactory.createForClass(Post)