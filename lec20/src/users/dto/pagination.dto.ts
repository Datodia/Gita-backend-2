import { Transform } from "class-transformer"
import { IsNumber, IsOptional, Max, Min } from "class-validator"


export class PaginationDto {
    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Max(30)
    take: number = 30


    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    @Min(1)
    page: number = 1

}