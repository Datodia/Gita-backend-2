import { IsNotEmpty, IsString } from "class-validator";

export class CreateAddressDto {

    @IsNotEmpty()
    @IsString()
    home: string

    @IsNotEmpty()
    @IsString()
    work: string
}