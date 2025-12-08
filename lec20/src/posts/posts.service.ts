import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class PostsService {
  constructor(@InjectModel('post') private PostModel: Model<Post>) {}

  async onModuleInit() {
    const postCount = await this.PostModel.countDocuments();
    console.log(postCount, 'postCoiunt');
    let dataToInsert: any = [];
    if (postCount === 50_000) {
      for (let i = 0; i < 450_000; i++) {
        dataToInsert.push({
          title: faker.person.fullName(),
          number: faker.number.int({ min: 15, max: 90 }),
          desc: faker.internet.email(),
        });

        if (dataToInsert.length === 10000) {
          await this.PostModel.insertMany(dataToInsert);
          console.log(`Inserted batch of ${10000}`);
          dataToInsert = [];
        }
      }
    }
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return this.PostModel.find({title: new RegExp('^Audrey')}).explain()
  }


  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
