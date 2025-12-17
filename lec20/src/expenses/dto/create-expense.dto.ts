import { ApiProperty } from "@nestjs/swagger"
import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CraeteExpenseDto {
    @ApiProperty({example: 400})
    @IsNotEmpty()
    @IsNumber()
    amount: number


    @ApiProperty({example: 'food'})
    @IsNotEmpty()
    @IsString()
    @IsIn(['food', 'gym', 'electronics', 'shopping'])
    category: string
}