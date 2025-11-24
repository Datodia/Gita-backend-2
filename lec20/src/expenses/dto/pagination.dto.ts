import { Transform } from "class-transformer"
import { IsNumber, IsOptional, Max, Min } from "class-validator"

export class QueryParamsDTO {
    @IsOptional()
    @IsNumber()
    @Transform(({value}) => Number(value))
    @Min(1)
    page: number = 1


    @IsOptional()
    @IsNumber()
    // @Transform(({value}) => Math.min(30, Number(value))) //30 ერროს არ დაარტყავს
    @Transform(({value}) => Number(value))
    @Max(30) // ეს დაარტყავს ერორს
    take: number = 30
}