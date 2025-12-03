import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { postModel } from './entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: "post", schema: postModel}
    ])
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
