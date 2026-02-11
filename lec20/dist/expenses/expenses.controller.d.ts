import { ExpensesService } from './expenses.service';
import { CraeteExpenseDto } from './dto/create-expense.dto';
import { QueryParamsDTO } from './dto/pagination.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
export declare class ExpensesController {
    private expensesService;
    constructor(expensesService: ExpensesService);
    getAll(query: QueryParamsDTO): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expenses, {}, {}> & import("./schema/expense.schema").Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expenses, {}, {}> & import("./schema/expense.schema").Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/expense.schema").Expenses, "find", {}>;
    getById({ id }: IsValidObjectId): Promise<import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expenses, {}, {}> & import("./schema/expense.schema").Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createExpense(createExpenseDto: CraeteExpenseDto, userId: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/expense.schema").Expenses, {}, {}> & import("./schema/expense.schema").Expenses & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateExpense(updateExpenseDto: UpdateExpenseDto, { id }: IsValidObjectId, userId: any): string;
    deleteExpense({ id }: IsValidObjectId, userId: any): Promise<string>;
}
