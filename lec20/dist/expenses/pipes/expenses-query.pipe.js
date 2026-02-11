"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseQuery = void 0;
const common_1 = require("@nestjs/common");
class ExpenseQuery {
    transform(value, metadata) {
        const supportedCategories = ['shopping', 'food', 'gym', 'electronics'];
        if ('category' in value && !supportedCategories.includes(value.category)) {
            throw new common_1.BadRequestException('wront category provided');
        }
        if ('priceFrom' in value && isNaN(value.priceFrom)) {
            throw new common_1.BadRequestException('Wrong priceFrom provided');
        }
        if ('priceFrom' in value) {
            value.priceFrom = Number(value.priceFrom);
        }
        if ('priceTo' in value && isNaN(value.priceTo)) {
            throw new common_1.BadRequestException('Wrong priceTo provided');
        }
        if ('priceTo' in value) {
            value.priceTo = Number(value.priceTo);
        }
        return value;
    }
}
exports.ExpenseQuery = ExpenseQuery;
//# sourceMappingURL=expenses-query.pipe.js.map