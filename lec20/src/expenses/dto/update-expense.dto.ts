import { PartialType } from "@nestjs/swagger";
import { CraeteExpenseDto } from "./create-expense.dto";


export class UpdateExpenseDto extends PartialType(CraeteExpenseDto){}
