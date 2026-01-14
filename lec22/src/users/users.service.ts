import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schema/user.schema";
import { CreateUserInput } from "./dto/create-user.input";


@Injectable()
export class UsersService {
    constructor(
        @InjectModel('users') private usersModel: Model<User>
    ){}


    getAll(){
        return this.usersModel.find().populate({path: 'posts'}).sort({_id: -1}).limit(10)
    }

    async createUser({email, fullName}: CreateUserInput){
        const existsUser = await this.usersModel.findOne({email})
        if(existsUser) throw new BadRequestException('User Already Exists')

        const newUser = await this.usersModel.create({email, fullName})

        return newUser
    }

}