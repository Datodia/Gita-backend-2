import { OnModuleInit } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User } from './schema/users.schema';
import { PaginationDto } from './dto/pagination.dto';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
export declare class UsersService implements OnModuleInit {
    private awsS3Service;
    private userModel;
    constructor(awsS3Service: AwsS3Service, userModel: Model<User>);
    onModuleInit(): Promise<void>;
    uploadUserPhoto(file: Express.Multer.File): Promise<any>;
    uploadMany(files: Express.Multer.File[]): Promise<string[]>;
    getFile(fileId: string): Promise<string | undefined>;
    deleteFile(fileId: string): Promise<string>;
    findAll({ page, take }: PaginationDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, User, "find", {}>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    addExpenseToUser(expenseId: any, userId: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}
