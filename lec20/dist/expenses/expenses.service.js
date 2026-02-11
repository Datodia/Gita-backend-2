"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ExpensesService = class ExpensesService {
    expenseModel;
    userModel;
    usersService;
    constructor(expenseModel, userModel, usersService) {
        this.expenseModel = expenseModel;
        this.userModel = userModel;
        this.usersService = usersService;
    }
    getAllExpenses({ page, take }) {
        return this.expenseModel
            .find()
            .populate({ path: 'user', select: '-expenses' });
    }
    async getExpenseById(id) {
        const expense = await this.expenseModel.findById(id).populate('user').select('-expenses');
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        return expense;
    }
    async createExpense({ amount, category }, userId) {
        const newExpense = await this.expenseModel.create({
            amount,
            category,
            user: userId,
        });
        await this.userModel.findByIdAndUpdate(userId, { $push: { expenses: newExpense._id } }, { new: true });
        return newExpense;
    }
    async deleteExpenseById(expenseId, userId) {
        const existExpense = await this.expenseModel.findById(expenseId);
        if (!existExpense)
            throw new common_1.NotFoundException('Expense not found');
        if (existExpense.user !== userId) {
            throw new common_1.UnauthorizedException('Permition denied');
        }
        const deletedExpense = await this.expenseModel.findByIdAndDelete(expenseId);
        if (!deletedExpense)
            throw new common_1.NotFoundException('Expense not found');
        await this.userModel.findByIdAndUpdate(userId, {
            $pull: { expenses: deletedExpense?._id },
        });
        return 'deleted successfully';
    }
    deleteAllExpesesByUserId() { }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('expense')),
    __param(1, (0, mongoose_1.InjectModel)('user')),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map