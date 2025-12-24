import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { faker } from '@faker-js/faker';
import { userModel } from 'src/users/schema/users.schema';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel('post') private PostModel: Model<Post>
  ) {}

  async onModuleInit() {
    const postCount = await this.PostModel.countDocuments();
    console.log(postCount, 'postCoiunt');
    await this.PostModel.deleteMany()
    let dataToInsert: any = [];
    // if (postCount === 50_000) {
    //   for (let i = 0; i < 450_000; i++) {
    //     dataToInsert.push({
    //       title: faker.person.fullName(),
    //       number: faker.number.int({ min: 15, max: 90 }),
    //       desc: faker.internet.email(),
    //     });

    //     if (dataToInsert.length === 10000) {
    //       await this.PostModel.insertMany(dataToInsert);
    //       console.log(`Inserted batch of ${10000}`);
    //       dataToInsert = [];
    //     }
    //   }
    // }
  }

  async create(createPostDto: CreatePostDto) {
    const newPost = await this.PostModel.create(createPostDto)
    return newPost
  }

  findAll() {
    return this.PostModel.find()
  }


  async findOne(id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException('Invalid Id provided')

    const post = await this.PostModel.findById(id)
    if(!post) throw new NotFoundException('post not found')
    
    return post
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
