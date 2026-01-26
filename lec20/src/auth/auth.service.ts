import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { VerifyUserDto } from './dto/verify-user.dto';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { ResendVerificationCodeDto } from './dto/resend-verification-code.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('user') private userModel: Model<User>,
        private jwtService: JwtService,
        private emailSenderService: EmailSenderService,
    ){}


    async signUp({age, email, fullName, password}: SignUpDto){
        const existUser = await this.userModel.findOne({email})
        if(existUser) throw new BadRequestException('User already exists')

        const hashedPassword = await bcrypt.hash(password, 10)
        const otpCode = Math.random().toString().slice(2, 8)
        const optCodeExpirationDate = new Date().setTime(new Date().getTime() + 3 * 60 * 1000)
        await this.userModel.create({
            email,
            fullName, 
            age, 
            password: hashedPassword,
            OTPCode: otpCode,
            OTPCodeExpirationDate: optCodeExpirationDate
        })
        await this.emailSenderService.sendOTPCode(email, otpCode)
        return 'Check email for verify'
    }

    async resendVerificationCode({email}: ResendVerificationCodeDto){
        const existUser = await this.userModel.findOne({email})
        if(!existUser) throw new BadRequestException('User Not found')

        if(existUser.isVerfied) throw new BadRequestException('You already verified')

        if(new Date().getTime() < Number(existUser.OTPCodeExpirationDate)) throw new BadRequestException('OTP code is not outdated')

        const otpCode = Math.random().toString().slice(2, 8)
        const optCodeExpirationDate = new Date().setTime(new Date().getTime() + 3 * 60 * 1000)
        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: otpCode,
            OTPCodeExpirationDate: optCodeExpirationDate,
        })
        await this.emailSenderService.sendOTPCode(email, otpCode)
        return 'check email for verify'
    }

    async verifyUser({email, otpCode}: VerifyUserDto){
        const existUser = await this.userModel.findOne({email})
        if(!existUser) throw new BadRequestException('User Not found')

        if(otpCode !== existUser.OTPCode) throw new BadRequestException('Wrong OTP code')

        if(new Date().getTime() > Number(existUser.OTPCodeExpirationDate)) throw new BadRequestException('OTP code outdated')
        
        await this.userModel.findByIdAndUpdate(existUser._id, {
            OTPCode: null,
            OTPCodeExpirationDate: null,
            isVerfied: true
        })

        const payload = {
            userId: existUser._id
        }
        
        const token = await this.jwtService.sign(payload, {expiresIn: '1h'})
     
        return {token}
    }


    async signIn({email, password}: SignInDto){
        const existUser = await this.userModel.findOne({email}).select('+password')
        if(!existUser) throw new BadRequestException('Invalid Credentials')

        if(!existUser.isVerfied) throw new BadRequestException('Verify User')

        const isPassEqual = await bcrypt.compare(password, existUser.password)

        if(!isPassEqual) throw new BadRequestException('Invalid Credentials')
        
        const payload = {
            userId: existUser._id
        }
        
        const token = await this.jwtService.sign(payload, {expiresIn: '1h'})
     
        return {token}
    }

    async currentUser(userId){
        const user = await this.userModel.findById(userId)
        return user
    }
}
