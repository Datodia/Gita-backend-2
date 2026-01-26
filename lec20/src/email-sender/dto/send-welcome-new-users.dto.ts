import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendWelcomeTextToNEwUSerDto {
  @IsNotEmpty()
  @IsEmail()
  to: string;
}
