import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExpensesService } from 'src/expenses/expenses.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from './schema/users.schema';
import { fa, faker } from '@faker-js/faker';
import { Role } from 'src/enum/role.enum';
import { PaginationDto } from './dto/pagination.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    private awsS3Service: AwsS3Service,
    @InjectModel('user') private userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const usersCount = await this.userModel.countDocuments();
    // await this.userModel.updateMany(
    //   {role: {$exists: false}},
    //   {$set: {role: Role.ADMIN}}
    // )
    // await this.userModel.deleteMany()
    console.log(usersCount, 'userCount');
    if (usersCount === 6) {
      let dataToInsert: any[] = [];
      for (let i = 0; i < 5000; i++) {
        dataToInsert.push({
          fullName: faker.person.fullName(),
          age: faker.number.int({ min: 15, max: 90 }),
          email: `${i}${faker.internet.email()}`,
          password: faker.person.fullName(),
        });
      }
      // Insert any remaining users (final batch)
     
        await this.userModel.insertMany(dataToInsert);
        console.log(`Inserted final batch of ${dataToInsert.length}`);
    }
  }

  async uploadUserPhoto(file: Express.Multer.File){
    const ext = file.mimetype.split('/')[1]
    const fileId = `images/${randomUUID()}.${ext}`
    const result = await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype)
    // await userModel.findByIdAndUpdate(userId, {profileImage: fileId}, {new: true})
    return result
  }

  async uploadMany(files: Express.Multer.File[]){
    const uploadedImages: string[] = []
    for(let file of files){
      const ext = file.mimetype.split('/')[1]
      const fileId = `images/${randomUUID()}.${ext}`
      const result = await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype)
      uploadedImages.push(result)
    }

    return uploadedImages
  }

  async getFile(fileId: string){
    const result = await this.awsS3Service.getFile(fileId)
    return result
  }

  async deleteFile(fileId: string){
    const result = await this.awsS3Service.deleteFile(fileId)
    return result
  }

  findAll({page, take}: PaginationDto) {
    const skip = (page - 1) * take

    return this.userModel
      .find({}, {fullName: 1, email: 1, age: 1, _id: 0})
      .skip(skip)
      .limit(take)
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto, 'updateUserDto');
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('user not found');

    if (updateUserDto.fullName) user.fullName = updateUserDto.fullName;
    if (updateUserDto.age) user.age = updateUserDto.age;
    if (updateUserDto.email) user.email = updateUserDto.email;

    // if (updateUserDto.address) {
    //   Object.assign(user.address, updateUserDto.address);
    // }

    return user.save();
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) throw new NotFoundException('user not found');

    return deletedUser;
  }

  async addExpenseToUser(expenseId, userId) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { expenses: expenseId } },
      { new: true },
    );

    return updatedUser;
  }
}
