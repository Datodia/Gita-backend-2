import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IExpenses } from './interface/expense.interface';
import { CraeteExpenseDto } from './dto/create-expense.dto';
import { QueryParamsDTO } from './dto/pagination.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ExpensesService {

    constructor(
        @Inject(forwardRef(() => UsersService))
        private usersService: UsersService
    ){}

  private expenses: IExpenses[] = [
    {
      id: 1,
      amount: 365,
      category: 'entertainment',
      createdAt: '2025-04-27T00:00:00Z',
    },
    {
      id: 2,
      amount: 101,
      category: 'utilities',
      createdAt: '2025-02-07T00:00:00Z',
    },
    {
      id: 3,
      amount: 255,
      category: 'transport',
      createdAt: '2025-10-27T00:00:00Z',
    },
    {
      id: 4,
      amount: 172,
      category: 'entertainment',
      createdAt: '2025-09-10T00:00:00Z',
    },
    {
      id: 5,
      amount: 326,
      category: 'entertainment',
      createdAt: '2025-09-30T00:00:00Z',
    },
    {
      id: 6,
      amount: 148,
      category: 'transport',
      createdAt: '2025-04-27T00:00:00Z',
    },
    {
      id: 7,
      amount: 389,
      category: 'shopping',
      createdAt: '2025-11-15T00:00:00Z',
    },
    {
      id: 8,
      amount: 489,
      category: 'transport',
      createdAt: '2025-08-12T00:00:00Z',
    },
    {
      id: 9,
      amount: 306,
      category: 'transport',
      createdAt: '2025-09-01T00:00:00Z',
    },
    {
      id: 10,
      amount: 275,
      category: 'transport',
      createdAt: '2025-06-15T00:00:00Z',
    },
    {
      id: 11,
      amount: 456,
      category: 'shopping',
      createdAt: '2025-04-23T00:00:00Z',
    },
    {
      id: 12,
      amount: 293,
      category: 'entertainment',
      createdAt: '2025-01-11T00:00:00Z',
    },
    {
      id: 13,
      amount: 337,
      category: 'education',
      createdAt: '2025-01-16T00:00:00Z',
    },
    {
      id: 14,
      amount: 426,
      category: 'education',
      createdAt: '2025-08-31T00:00:00Z',
    },
    {
      id: 15,
      amount: 178,
      category: 'transport',
      createdAt: '2025-04-09T00:00:00Z',
    },
    {
      id: 16,
      amount: 478,
      category: 'shopping',
      createdAt: '2025-05-01T00:00:00Z',
    },
    { id: 17, amount: 100, category: 'gym', createdAt: '2025-03-27T00:00:00Z' },
    { id: 18, amount: 100, category: 'gym', createdAt: '2025-09-03T00:00:00Z' },
    { id: 19, amount: 52, category: 'food', createdAt: '2025-09-12T00:00:00Z' },
    {
      id: 20,
      amount: 221,
      category: 'shopping',
      createdAt: '2025-11-09T00:00:00Z',
    },
    {
      id: 21,
      amount: 418,
      category: 'health',
      createdAt: '2025-05-23T00:00:00Z',
    },
    {
      id: 22,
      amount: 248,
      category: 'utilities',
      createdAt: '2025-08-31T00:00:00Z',
    },
    { id: 23, amount: 84, category: 'food', createdAt: '2025-11-15T00:00:00Z' },
    { id: 24, amount: 100, category: 'gym', createdAt: '2025-02-04T00:00:00Z' },
    { id: 25, amount: 100, category: 'gym', createdAt: '2025-01-12T00:00:00Z' },
    {
      id: 26,
      amount: 378,
      category: 'health',
      createdAt: '2025-02-24T00:00:00Z',
    },
    {
      id: 27,
      amount: 268,
      category: 'entertainment',
      createdAt: '2025-11-11T00:00:00Z',
    },
    {
      id: 28,
      amount: 415,
      category: 'food',
      createdAt: '2025-08-23T00:00:00Z',
    },
    {
      id: 29,
      amount: 199,
      category: 'shopping',
      createdAt: '2025-06-01T00:00:00Z',
    },
    { id: 30, amount: 100, category: 'gym', createdAt: '2025-01-12T00:00:00Z' },
    {
      id: 31,
      amount: 52,
      category: 'utilities',
      createdAt: '2025-08-05T00:00:00Z',
    },
    {
      id: 32,
      amount: 315,
      category: 'food',
      createdAt: '2025-04-10T00:00:00Z',
    },
    {
      id: 33,
      amount: 165,
      category: 'shopping',
      createdAt: '2025-01-03T00:00:00Z',
    },
    {
      id: 34,
      amount: 188,
      category: 'entertainment',
      createdAt: '2025-07-29T00:00:00Z',
    },
    {
      id: 35,
      amount: 96,
      category: 'education',
      createdAt: '2025-07-26T00:00:00Z',
    },
    {
      id: 36,
      amount: 103,
      category: 'utilities',
      createdAt: '2025-07-31T00:00:00Z',
    },
    {
      id: 37,
      amount: 255,
      category: 'shopping',
      createdAt: '2025-06-28T00:00:00Z',
    },
    {
      id: 38,
      amount: 471,
      category: 'food',
      createdAt: '2025-06-17T00:00:00Z',
    },
    {
      id: 39,
      amount: 147,
      category: 'entertainment',
      createdAt: '2025-08-24T00:00:00Z',
    },
    {
      id: 40,
      amount: 366,
      category: 'shopping',
      createdAt: '2025-02-11T00:00:00Z',
    },
    {
      id: 41,
      amount: 379,
      category: 'shopping',
      createdAt: '2025-03-14T00:00:00Z',
    },
    {
      id: 42,
      amount: 380,
      category: 'food',
      createdAt: '2025-07-25T00:00:00Z',
    },
    { id: 43, amount: 98, category: 'food', createdAt: '2025-02-25T00:00:00Z' },
    {
      id: 44,
      amount: 259,
      category: 'shopping',
      createdAt: '2025-06-17T00:00:00Z',
    },
    {
      id: 45,
      amount: 429,
      category: 'shopping',
      createdAt: '2025-04-17T00:00:00Z',
    },
    {
      id: 46,
      amount: 290,
      category: 'health',
      createdAt: '2025-08-25T00:00:00Z',
    },
    { id: 47, amount: 100, category: 'gym', createdAt: '2025-01-26T00:00:00Z' },
    {
      id: 48,
      amount: 471,
      category: 'food',
      createdAt: '2025-10-11T00:00:00Z',
    },
    {
      id: 49,
      amount: 199,
      category: 'health',
      createdAt: '2025-02-07T00:00:00Z',
    },
    {
      id: 50,
      amount: 191,
      category: 'entertainment',
      createdAt: '2025-11-08T00:00:00Z',
    },
    {
      id: 51,
      amount: 413,
      category: 'entertainment',
      createdAt: '2025-08-15T00:00:00Z',
    },
    {
      id: 52,
      amount: 105,
      category: 'entertainment',
      createdAt: '2025-11-16T00:00:00Z',
    },
    {
      id: 53,
      amount: 94,
      category: 'shopping',
      createdAt: '2025-07-12T00:00:00Z',
    },
    {
      id: 54,
      amount: 155,
      category: 'health',
      createdAt: '2025-07-05T00:00:00Z',
    },
    {
      id: 55,
      amount: 491,
      category: 'food',
      createdAt: '2025-08-30T00:00:00Z',
    },
    {
      id: 56,
      amount: 271,
      category: 'transport',
      createdAt: '2025-08-03T00:00:00Z',
    },
    {
      id: 57,
      amount: 188,
      category: 'transport',
      createdAt: '2025-08-19T00:00:00Z',
    },
    { id: 58, amount: 100, category: 'gym', createdAt: '2025-05-07T00:00:00Z' },
    {
      id: 59,
      amount: 75,
      category: 'entertainment',
      createdAt: '2025-09-30T00:00:00Z',
    },
    {
      id: 60,
      amount: 112,
      category: 'utilities',
      createdAt: '2025-03-05T00:00:00Z',
    },
    {
      id: 61,
      amount: 75,
      category: 'utilities',
      createdAt: '2025-09-14T00:00:00Z',
    },
    {
      id: 62,
      amount: 447,
      category: 'food',
      createdAt: '2025-01-11T00:00:00Z',
    },
    { id: 63, amount: 82, category: 'food', createdAt: '2025-08-15T00:00:00Z' },
    {
      id: 64,
      amount: 95,
      category: 'health',
      createdAt: '2025-01-26T00:00:00Z',
    },
    {
      id: 65,
      amount: 379,
      category: 'utilities',
      createdAt: '2025-10-10T00:00:00Z',
    },
    {
      id: 66,
      amount: 396,
      category: 'utilities',
      createdAt: '2025-11-24T00:00:00Z',
    },
    {
      id: 67,
      amount: 219,
      category: 'entertainment',
      createdAt: '2025-02-13T00:00:00Z',
    },
    {
      id: 68,
      amount: 291,
      category: 'education',
      createdAt: '2025-04-03T00:00:00Z',
    },
    {
      id: 69,
      amount: 413,
      category: 'transport',
      createdAt: '2025-01-11T00:00:00Z',
    },
    {
      id: 70,
      amount: 119,
      category: 'food',
      createdAt: '2025-06-20T00:00:00Z',
    },
    { id: 71, amount: 98, category: 'food', createdAt: '2025-02-18T00:00:00Z' },
    {
      id: 72,
      amount: 249,
      category: 'food',
      createdAt: '2025-04-25T00:00:00Z',
    },
    {
      id: 73,
      amount: 437,
      category: 'shopping',
      createdAt: '2025-04-26T00:00:00Z',
    },
    {
      id: 74,
      amount: 203,
      category: 'health',
      createdAt: '2025-09-09T00:00:00Z',
    },
    {
      id: 75,
      amount: 309,
      category: 'education',
      createdAt: '2025-01-26T00:00:00Z',
    },
    {
      id: 76,
      amount: 345,
      category: 'transport',
      createdAt: '2025-06-12T00:00:00Z',
    },
    {
      id: 77,
      amount: 141,
      category: 'shopping',
      createdAt: '2025-10-08T00:00:00Z',
    },
    {
      id: 78,
      amount: 62,
      category: 'entertainment',
      createdAt: '2025-07-10T00:00:00Z',
    },
    {
      id: 79,
      amount: 359,
      category: 'education',
      createdAt: '2025-03-02T00:00:00Z',
    },
    {
      id: 80,
      amount: 175,
      category: 'transport',
      createdAt: '2025-08-19T00:00:00Z',
    },
    {
      id: 81,
      amount: 141,
      category: 'transport',
      createdAt: '2025-05-29T00:00:00Z',
    },
    {
      id: 82,
      amount: 346,
      category: 'education',
      createdAt: '2025-06-21T00:00:00Z',
    },
    {
      id: 83,
      amount: 99,
      category: 'entertainment',
      createdAt: '2025-06-23T00:00:00Z',
    },
    {
      id: 84,
      amount: 317,
      category: 'education',
      createdAt: '2025-02-09T00:00:00Z',
    },
    { id: 85, amount: 100, category: 'gym', createdAt: '2025-09-01T00:00:00Z' },
    {
      id: 86,
      amount: 90,
      category: 'transport',
      createdAt: '2025-08-20T00:00:00Z',
    },
    {
      id: 87,
      amount: 111,
      category: 'utilities',
      createdAt: '2025-03-20T00:00:00Z',
    },
    {
      id: 88,
      amount: 247,
      category: 'transport',
      createdAt: '2025-11-12T00:00:00Z',
    },
    {
      id: 89,
      amount: 83,
      category: 'shopping',
      createdAt: '2025-10-31T00:00:00Z',
    },
    {
      id: 90,
      amount: 194,
      category: 'health',
      createdAt: '2025-07-22T00:00:00Z',
    },
    {
      id: 91,
      amount: 170,
      category: 'entertainment',
      createdAt: '2025-04-12T00:00:00Z',
    },
    { id: 92, amount: 100, category: 'gym', createdAt: '2025-04-11T00:00:00Z' },
    {
      id: 93,
      amount: 169,
      category: 'education',
      createdAt: '2025-02-26T00:00:00Z',
    },
    { id: 94, amount: 100, category: 'gym', createdAt: '2025-11-16T00:00:00Z' },
    {
      id: 95,
      amount: 368,
      category: 'entertainment',
      createdAt: '2025-03-25T00:00:00Z',
    },
    { id: 96, amount: 100, category: 'gym', createdAt: '2025-03-20T00:00:00Z' },
    {
      id: 97,
      amount: 310,
      category: 'food',
      createdAt: '2025-07-13T00:00:00Z',
    },
    {
      id: 98,
      amount: 337,
      category: 'transport',
      createdAt: '2025-08-10T00:00:00Z',
    },
    {
      id: 99,
      amount: 163,
      category: 'utilities',
      createdAt: '2025-03-17T00:00:00Z',
    },
    {
      id: 100,
      amount: 377,
      category: 'entertainment',
      createdAt: '2025-10-08T00:00:00Z',
    },
  ];

  getAllExpenses({ page, take }: QueryParamsDTO) {
    const start = (page - 1) * take;
    const end = page * take;
    const data = this.expenses.slice(start, end);
    return {
      page,
      take,
      total: this.expenses.length,
      expenses: data,
    };
  }

  getExpenseById(id: number): IExpenses {
    const expense = this.expenses.find((expense) => expense.id === id);
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  createExpense({ amount, category }: CraeteExpenseDto) {
    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;

    const newExpense = {
      id: lastId + 1,
      amount,
      category,
      createdAt: new Date().toISOString(),
    };

    this.expenses.push(newExpense);
    this.usersService.addExpenseToUser()

    return newExpense;
  }

  deleteAllExpesesByUserId(){

  }
}
