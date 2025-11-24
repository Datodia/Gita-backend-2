import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpensePipe } from './pipes/create-expense.pipe';
import { CraeteExpenseDto } from './dto/create-expense.dto';
import { ExpenseQuery } from './pipes/expenses-query.pipe';
import { QueryParamsDTO } from './dto/pagination.dto';
import type { Request, Response } from 'express';

@Controller('expenses')
export class ExpensesController {
    constructor(private expensesService: ExpensesService){}


    @Get()
    // getAll( @Query(new ExpenseQuery()) query ){
    getAll(@Req() req: Request, @Res() res: Response, @Query() query: QueryParamsDTO ){
        // return res.redirect('https://www.example.com')
        return this.expensesService.getAllExpenses(query)
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id){

        return this.expensesService.getExpenseById(id)
    }

    @Post()
    // createExpense(@Body(new CreateExpensePipe()) {amount, category}: CraeteExpenseDto){
    createExpense(@Body() createExpenseDto: CraeteExpenseDto){
        console.log(createExpenseDto, "creatEExpenseDT")
        return this.expensesService.createExpense(createExpenseDto)
    }

}
