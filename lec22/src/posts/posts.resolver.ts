import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostPayload } from './payload/post.payload';
import { UseGuards } from '@nestjs/common';
import { HasUserId } from './guards/has-user-id.guard';
import { UserId } from 'src/users/decorators/user-id.decorator';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => PostPayload)
  @UseGuards(HasUserId)
  createPost(@UserId() userId ,@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postsService.create(createPostInput, userId);
  }

  @Query(() => [PostPayload])
  getAllPosts() {
    return this.postsService.findAll();
  }

  // @Query('post')
  // findOne(@Args('id') id: number) {
  //   return this.postsService.findOne(id);
  // }

  // @Mutation('updatePost')
  // update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postsService.update(updatePostInput.id, updatePostInput);
  // }

  // @Mutation('removePost')
  // remove(@Args('id') id: number) {
  //   return this.postsService.remove(id);
  // }
}
