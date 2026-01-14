import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schema/post.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('posts') private postsModel: Model<Post>,
    @InjectModel('users') private usersModel: Model<Post>,
  ){}

  async create({desc, title}: CreatePostInput, userId) {
    const user = await this.usersModel.findById(userId)
    if(!user) throw new BadRequestException('User not found')
    
    const newpost = await this.postsModel.create({title, desc, author: userId})
    await this.usersModel.findByIdAndUpdate(userId, {
      $push: {posts: newpost._id}
    }, {new: true})

    return newpost
  }

  findAll() {
    return this.postsModel.find().populate({path: 'author', select: 'fullName email'})
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
