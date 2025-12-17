import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

// @UseGuards(SafeGuard)
@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  // @UseGuards(new RoleGuard('admin', 'editor', 'viewer'))
  @Get()
  // getAll( @Query(new ExpenseQuery()) query ){
  // getAll(@Req() req: Request, @Res() res: Response, @Query() query: QueryParamsDTO ){
  @ApiQuery({ name: 'page', required: false, default: 1, example: 1 })
  @ApiQuery({ name: 'take', required: false, default: 30, example: 30 })
  @ApiOkResponse({
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
  })
  getAll(@Query() query: QueryParamsDTO) {
    // return res.redirect('https://www.example.com')
    return this.expensesService.getAllExpenses(query);
  }

  // @UseGuards(new RoleGuard('admin', 'editor', 'viewer'))
  @Get(':id')
  @ApiParam({ name: 'id', example: '693704fe27a7db834f2b7479', required: true })
  @ApiNotFoundResponse({
    example: {
      message: 'Expense not found',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiOkResponse({
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
  })
  getById(@Param() { id }: IsValidObjectId) {
    return this.expensesService.getExpenseById(id);
  }

  // @UseGuards(new RoleGuard('admin'), SafeGuard)
  @Post()
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  // createExpense(@Body(new CreateExpensePipe()) {amount, category}: CraeteExpenseDto){
  @ApiCreatedResponse({
    example: {
      category: 'food',
      amount: 400,
      user: '6942d76a1db0bf8a3d13b9ea',
      _id: '6942e1762bc110a8418ee5e1',
      __v: 0,
    },
  })
  createExpense(@Body() createExpenseDto: CraeteExpenseDto, @UserId() userId) {
    return this.expensesService.createExpense(createExpenseDto, userId);
  }

  @Patch(':id')
  @UseGuards(IsAuthGuard)
  @ApiBearerAuth()
  @ApiParam({name: 'id', example: '6942e1762bc110a8418ee5e1'})
  @ApiCreatedResponse({example: 'updated'})
  updateExpense(
    @Body() updateExpenseDto: UpdateExpenseDto,
    @Param() { id }: IsValidObjectId,
    @UserId() userId,
  ) {
    return 'updated';
  }

  @Delete(':id')
  @UseGuards(IsAuthGuard)
  deleteExpense(@Param() { id }: IsValidObjectId, @UserId() userId) {
    return this.expensesService.deleteExpenseById(id, userId);
  }
}
