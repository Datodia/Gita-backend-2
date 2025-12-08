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

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @Inject(forwardRef(() => ExpensesService))
    private expensesService: ExpensesService,
  ) {}

  async onModuleInit() {
    const usersCount = await this.userModel.countDocuments();
    // await this.userModel.deleteMany()
    console.log(usersCount, 'userCount');
    // if (usersCount === 0) {
    //   let dataToInsert: any[] = [];
    //   const BATCH_SIZE = 10_000;
    //   for (let i = 0; i < 500_000; i++) {
    //     dataToInsert.push({
    //       fullName: faker.person.fullName(),
    //       age: faker.number.int({ min: 15, max: 90 }),
    //       email: faker.internet.email(),
    //       address: {
    //         home: faker.location.street(),
    //         work: faker.location.street(),
    //       },
    //     });

    //     if (dataToInsert.length === BATCH_SIZE) {
    //       await this.userModel.insertMany(dataToInsert);
    //       console.log(`Inserted batch of ${BATCH_SIZE}`);
    //       dataToInsert = [];
    //     }
    //   }
    //   // Insert any remaining users (final batch)
    //   if (dataToInsert.length > 0) {
    //     await this.userModel.insertMany(dataToInsert);
    //     console.log(`Inserted final batch of ${dataToInsert.length}`);
    //   }
    //   console.log('Finished inserting 500,000 users');
    // }
  }

  findAll() {
    return this.userModel
      .find().populate('expenses', '-user -__v')
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
