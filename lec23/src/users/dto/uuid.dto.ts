import { IsNotEmpty, IsUUID } from "class-validator";


export class IsUUIDDto {
    @IsNotEmpty()
    @IsUUID()
    id: string
}