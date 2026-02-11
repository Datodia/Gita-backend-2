import { CraeteExpenseDto } from './dto/create-expense.dto';
import { QueryParamsDTO } from './dto/pagination.dto';
import { UsersService } from '../users/users.service';
import { Model } from 'mongoose';
import { Expenses } from './schema/expense.schema';
import { User } from '../users/schema/users.schema';
export declare class ExpensesService {
    private expenseModel;
    private userModel;
    private usersService;
    constructor(expenseModel: Model<Expenses>, userModel: Model<User>, usersService: UsersService);
    getAllExpenses({ page, take }: QueryParamsDTO): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Expenses, {}, {}> & Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Expenses, {}, {}> & Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Expenses, "find", {}>;
    getExpenseById(id: string): Promise<import("mongoose").Document<unknown, {}, Expenses, {}, {}> & Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createExpense({ amount, category }: CraeteExpenseDto, userId: any): Promise<import("mongoose").Document<unknown, {}, Expenses, {}, {}> & Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    deleteExpenseById(expenseId: any, userId: any): Promise<string>;
    deleteAllExpesesByUserId(): void;
}
