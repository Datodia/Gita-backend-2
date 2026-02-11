import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyUserDto } from './dto/verify-user.dto';
import { ResendVerificationCodeDto } from './dto/resend-verification-code.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: SignUpDto): Promise<string>;
    signInWithGoogle(): void;
    googleAuthCallback(req: any, res: any): Promise<void>;
    verifyUser(verifyUserDto: VerifyUserDto): Promise<{
        token: string;
    }>;
    resendVerifyCode(resendVerificationCodeDto: ResendVerificationCodeDto): Promise<string>;
    signIn(signInDto: SignInDto): Promise<{
        token: string;
    }>;
    currentUser(userId: any): Promise<(import("mongoose").Document<unknown, {}, import("../users/schema/users.schema").User, {}, {}> & import("../users/schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
