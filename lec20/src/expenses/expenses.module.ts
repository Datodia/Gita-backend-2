import { forwardRef, Module } from '@nestjs/common';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { expenseModel } from './schema/expense.schema';
import { userModel } from 'src/users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'expense', schema: expenseModel},
      {name: 'user', schema: userModel},
    ]),
    forwardRef(() => UsersModule)
  ],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [ExpensesService]
})
export class ExpensesModule {}
