import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ExpensesService } from 'src/expenses/expenses.service';

@Injectable()
export class UsersService {

  constructor(
    @Inject(forwardRef(() => ExpensesService))
    private expensesService: ExpensesService
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this.expensesService.deleteAllExpesesByUserId()
    return `This action removes a #${id} user`;
  }

  addExpenseToUser(){
    return 'This action adds new expense in expeses list'
  }
}
