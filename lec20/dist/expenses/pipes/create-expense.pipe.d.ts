import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { CraeteExpenseDto } from '../dto/create-expense.dto';
export declare class CreateExpensePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): CraeteExpenseDto;
}
