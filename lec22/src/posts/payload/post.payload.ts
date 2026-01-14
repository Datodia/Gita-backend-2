import { Field, GraphQLISODateTime, ID, ObjectType } from "@nestjs/graphql";
import { UserPayloadWitoutPosts } from "./user.payload";

@ObjectType()
export class PostPayload {

    @Field(() => ID)
    _id: string

     @Field(() => String)
    title: string

    @Field(() => String)
    desc: string

    @Field(() => GraphQLISODateTime)
    createdAt: Date

    @Field(() => GraphQLISODateTime)
    updatedAt: Date


    @Field(() => UserPayloadWitoutPosts)
    author: object 
  
}