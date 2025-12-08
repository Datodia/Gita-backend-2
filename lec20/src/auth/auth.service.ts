import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schema/users.schema';
import bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('user') private userModel: Model<User>,
        private jwtService: JwtService
    ){}


    async signUp({age, email, fullName, password}: SignUpDto){
        const existUser = await this.userModel.findOne({email})
        if(existUser) throw new BadRequestException('User already exists')

        const hashedPassword = await bcrypt.hash(password, 10)
        await this.userModel.create({email, fullName, age, password: hashedPassword})
        return 'User created successfully'
    }



    async signIn({email, password}: SignInDto){
        const existUser = await this.userModel.findOne({email}).select('+password')

        if(!existUser) throw new BadRequestException('Invalid Credentials')

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
