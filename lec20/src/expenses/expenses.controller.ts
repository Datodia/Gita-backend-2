import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpensePipe } from './pipes/create-expense.pipe';
import { CraeteExpenseDto } from './dto/create-expense.dto';
import { ExpenseQuery } from './pipes/expenses-query.pipe';
import { QueryParamsDTO } from './dto/pagination.dto';
import type { Request, Response } from 'express';
import { SafeGuard } from 'src/guards/safe.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';

// @UseGuards(SafeGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  // @UseGuards(new RoleGuard('admin', 'editor', 'viewer'))
  @Get()
  // getAll( @Query(new ExpenseQuery()) query ){
  // getAll(@Req() req: Request, @Res() res: Response, @Query() query: QueryParamsDTO ){
  getAll(@Query() query: QueryParamsDTO) {
    // return res.redirect('https://www.example.com')
    return this.expensesService.getAllExpenses(query);
  }

  @UseGuards(new RoleGuard('admin', 'editor', 'viewer'))
  @Get(':id')
  getById(@Param() {id}: IsValidObjectId) {
    return this.expensesService.getExpenseById(id);
  }

  // @UseGuards(new RoleGuard('admin'), SafeGuard)
  @Post()
  // createExpense(@Body(new CreateExpensePipe()) {amount, category}: CraeteExpenseDto){
  createExpense(@Body() createExpenseDto: CraeteExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }
}
