import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CraeteExpenseDto } from '../dto/create-expense.dto';

@Injectable()
export class CreateExpensePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): CraeteExpenseDto {
    // category: 'shopping, food, gym, electroincs'

    if (!value || !value.amount || !value.category)
      throw new BadRequestException('Category and amount is required');
    const supportedCategories = ['shopping', 'food', 'gym', 'electronics'];

    if ('category' in value && !supportedCategories.includes(value.category)) {
      throw new BadRequestException('Provide supported categories');
    }

    if ('amount' in value && isNaN(value.amount)) {
      throw new BadRequestException('Please provide valid amount');
    }

    value.amount = Number(value.amount);

    return { amount: value.amount, category: value.category, user: value.user };
  }
}
