import { SignUpDto } from './dto/sign-up.dto';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifyUserDto } from './dto/verify-user.dto';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { ResendVerificationCodeDto } from './dto/resend-verification-code.dto';
export declare class AuthService {
    private userModel;
    private jwtService;
    private emailSenderService;
    constructor(userModel: Model<User>, jwtService: JwtService, emailSenderService: EmailSenderService);
    signUp({ age, email, fullName, password }: SignUpDto): Promise<string>;
    resendVerificationCode({ email }: ResendVerificationCodeDto): Promise<string>;
    verifyUser({ email, otpCode }: VerifyUserDto): Promise<{
        token: string;
    }>;
    signIn({ email, password }: SignInDto): Promise<{
        token: string;
    }>;
    signInWithGoogle(user: any): Promise<{
        token: string;
        redirectUrl: string | undefined;
    }>;
    currentUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
