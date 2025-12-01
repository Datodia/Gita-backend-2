import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExpensesService } from 'src/expenses/expenses.service';
import { InjectModel } from '@nestjs/mongoose';
import  { Model, ObjectId } from 'mongoose';
import { User } from './schema/users.schema';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @Inject(forwardRef(() => ExpensesService))
    private expensesService: ExpensesService
  ){}

  async create({age, email, fullName}: CreateUserDto) {
    const existuser = await this.userModel.findOne({email})
    if(existuser) throw new BadRequestException('user already exists')

    const newUser = await this.userModel.create({age, email, fullName})
    
    return newUser
  }

  findAll() {
    return this.userModel.find().populate({path: 'expenses', select: '-user'})
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    if(!user) throw new NotFoundException('user not found')
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto, "updateUserDto")
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      {new: true}
    )

    if(!updatedUser) throw new NotFoundException('user not found')

    return updatedUser
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id)
    if(!deletedUser) throw new NotFoundException('user not found')
    
    return deletedUser
  }

  async addExpenseToUser(expenseId, userId){
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {$push: {expenses: expenseId}},
      {new: true}
    )

    return updatedUser
  }
}
