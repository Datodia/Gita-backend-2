import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';

@Injectable()
export class AppService {

  constructor(
    @InjectModel('user') private userModel: Model<User>
  ){}

  getHello(): string {
    return 'Hello World!';
  }

  getAllUsers(){
    return this.userModel.find()
  }

  createUser(createUserDto){
    return this.userModel.create(createUserDto)
  }
}
