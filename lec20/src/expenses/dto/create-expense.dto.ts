import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CraeteExpenseDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number


    @IsNotEmpty()
    @IsString()
    @IsIn(['food', 'gym', 'electronics', 'shopping'])
    category: string

    @IsNotEmpty()
    @IsMongoId()
    user: string
}