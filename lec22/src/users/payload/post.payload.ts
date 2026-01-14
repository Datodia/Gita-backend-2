import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  OmitType,
} from '@nestjs/graphql';
import { PostPayload } from 'src/posts/payload/post.payload';

@ObjectType()
export class PostPayloadWithoutAuthor {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  desc: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
