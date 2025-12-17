import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({example: "John Doe", type: String})
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({example: "John@gmail.com", type: String})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({example: 22, type: Number})
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({example: 'password123', type: String})
  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}
