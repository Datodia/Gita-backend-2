import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IExpenses } from './interface/expense.interface';
import { CraeteExpenseDto } from './dto/create-expense.dto';
import { QueryParamsDTO } from './dto/pagination.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expenses } from './schema/expense.schema';
import { User } from 'src/users/schema/users.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('expense') private expenseModel: Model<Expenses>,
    @InjectModel('user') private userModel: Model<User>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  getAllExpenses({ page, take }: QueryParamsDTO) {
    return this.expenseModel
      .find()
      .populate({ path: 'user', select: '-expenses' });
  }

  async getExpenseById(id: string) {
    const expense = await this.expenseModel.findById(id).populate('user').select('-expenses');
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async createExpense({ amount, category }: CraeteExpenseDto, userId) {
    const newExpense = await this.expenseModel.create({
      amount,
      category,
      user: userId,
    });
    // await this.usersService.addExpenseToUser(newExpense._id, user)
    await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { expenses: newExpense._id } },
      { new: true },
    );
    return newExpense;
  }

  async deleteExpenseById(expenseId, userId) {
    const existExpense = await this.expenseModel.findById(expenseId);
    if (!existExpense) throw new NotFoundException('Expense not found');

    if(existExpense.user !== userId){
      throw new UnauthorizedException('Permition denied') 
    }

    const deletedExpense = await this.expenseModel.findByIdAndDelete(expenseId);
    if (!deletedExpense) throw new NotFoundException('Expense not found');

    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { expenses: deletedExpense?._id },
    });

    return 'deleted successfully';
  }

  deleteAllExpesesByUserId() {}
}
