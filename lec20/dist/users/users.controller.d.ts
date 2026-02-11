import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidObjectId } from 'src/common/dto/is-valid-object-id.dto';
import { PaginationDto } from './dto/pagination.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    uploadFile(file: Express.Multer.File): Promise<any>;
    getFile(fileId: string): Promise<string | undefined>;
    uploadMany(files: Array<Express.Multer.File>): Promise<string[]>;
    deleteImage(fileId: string): Promise<string>;
    findAll(queryParams: PaginationDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/users.schema").User, {}, {}> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./schema/users.schema").User, {}, {}> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schema/users.schema").User, "find", {}>;
    findOne({ id }: IsValidObjectId): Promise<import("mongoose").Document<unknown, {}, import("./schema/users.schema").User, {}, {}> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update({ id }: IsValidObjectId, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./schema/users.schema").User, {}, {}> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove({ id }: IsValidObjectId): Promise<import("mongoose").Document<unknown, {}, import("./schema/users.schema").User, {}, {}> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
