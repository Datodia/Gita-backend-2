"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateExpensePipe = void 0;
const common_1 = require("@nestjs/common");
let CreateExpensePipe = class CreateExpensePipe {
    transform(value, metadata) {
        if (!value || !value.amount || !value.category)
            throw new common_1.BadRequestException('Category and amount is required');
        const supportedCategories = ['shopping', 'food', 'gym', 'electronics'];
        if ('category' in value && !supportedCategories.includes(value.category)) {
            throw new common_1.BadRequestException('Provide supported categories');
        }
        if ('amount' in value && isNaN(value.amount)) {
            throw new common_1.BadRequestException('Please provide valid amount');
        }
        value.amount = Number(value.amount);
        return { amount: value.amount, category: value.category };
    }
};
exports.CreateExpensePipe = CreateExpensePipe;
exports.CreateExpensePipe = CreateExpensePipe = __decorate([
    (0, common_1.Injectable)()
], CreateExpensePipe);
//# sourceMappingURL=create-expense.pipe.js.map