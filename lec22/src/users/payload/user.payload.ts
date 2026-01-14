import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostPayloadWithoutAuthor } from './post.payload';

@ObjectType()
export class UserPayload {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String)
  email: string;

  @Field(() => [PostPayloadWithoutAuthor])
  posts: object[]
}
