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
exports.ExpensesController = void 0;
const common_1 = require("@nestjs/common");
const expenses_service_1 = require("./expenses.service");
const create_expense_dto_1 = require("./dto/create-expense.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const is_valid_object_id_dto_1 = require("../common/dto/is-valid-object-id.dto");
const is_auth_guard_1 = require("../guards/is-auth.guard");
const user_id_decorator_1 = require("../decorators/user-id.decorator");
const update_expense_dto_1 = require("./dto/update-expense.dto");
const swagger_1 = require("@nestjs/swagger");
let ExpensesController = class ExpensesController {
    expensesService;
    constructor(expensesService) {
        this.expensesService = expensesService;
    }
    getAll(query) {
        return this.expensesService.getAllExpenses(query);
    }
    getById({ id }) {
        return this.expensesService.getExpenseById(id);
    }
    createExpense(createExpenseDto, userId) {
        return this.expensesService.createExpense(createExpenseDto, userId);
    }
    updateExpense(updateExpenseDto, { id }, userId) {
        return 'updated';
    }
    deleteExpense({ id }, userId) {
        return this.expensesService.deleteExpenseById(id, userId);
    }
};
exports.ExpensesController = ExpensesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, default: 1, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'take', required: false, default: 30, example: 30 }),
    (0, swagger_1.ApiOkResponse)({
        example: [
            {
                _id: '693704fe27a7db834f2b7479',
                category: 'shopping',
                amount: 400,
                user: {
                    _id: '6936f8a3ef4a97fff18e341a',
                    fullName: 'test user',
                    email: 'test@gmail.com',
                    age: 24,
                    createdAt: '2025-12-08T16:11:15.344Z',
                    updatedAt: '2025-12-15T17:08:52.758Z',
                    __v: 0,
                    isMerried: false,
                    role: 'admin',
                },
                __v: 0,
            },
        ],
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.QueryParamsDTO]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', example: '693704fe27a7db834f2b7479', required: true }),
    (0, swagger_1.ApiNotFoundResponse)({
        example: {
            message: 'Expense not found',
            error: 'Not Found',
            statusCode: 404,
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        example: {
            _id: '693704fe27a7db834f2b7479',
            category: 'shopping',
            amount: 400,
            user: {
                _id: '6936f8a3ef4a97fff18e341a',
                fullName: 'test user',
                email: 'test@gmail.com',
                age: 24,
                createdAt: '2025-12-08T16:11:15.344Z',
                updatedAt: '2025-12-15T17:08:52.758Z',
                __v: 0,
                isMerried: false,
                role: 'admin',
            },
            __v: 0,
        },
    }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [is_valid_object_id_dto_1.IsValidObjectId]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "getById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(is_auth_guard_1.IsAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiCreatedResponse)({
        example: {
            category: 'food',
            amount: 400,
            user: '6942d76a1db0bf8a3d13b9ea',
            _id: '6942e1762bc110a8418ee5e1',
            __v: 0,
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_expense_dto_1.CraeteExpenseDto, Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "createExpense", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(is_auth_guard_1.IsAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiParam)({ name: 'id', example: '6942e1762bc110a8418ee5e1' }),
    (0, swagger_1.ApiCreatedResponse)({ example: 'updated' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_expense_dto_1.UpdateExpenseDto,
        is_valid_object_id_dto_1.IsValidObjectId, Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "updateExpense", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(is_auth_guard_1.IsAuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, user_id_decorator_1.UserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [is_valid_object_id_dto_1.IsValidObjectId, Object]),
    __metadata("design:returntype", void 0)
], ExpensesController.prototype, "deleteExpense", null);
exports.ExpensesController = ExpensesController = __decorate([
    (0, common_1.Controller)('expenses'),
    __metadata("design:paramtypes", [expenses_service_1.ExpensesService])
], ExpensesController);
//# sourceMappingURL=expenses.controller.js.map