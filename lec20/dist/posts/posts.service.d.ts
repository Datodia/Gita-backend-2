import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Model } from 'mongoose';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private PostModel;
    constructor(PostModel: Model<Post>);
    onModuleInit(): Promise<void>;
    create(createPostDto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, Post, {}, {}> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Post, {}, {}> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Post, {}, {}> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Post, "find", {}>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Post, {}, {}> & Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: number, updatePostDto: UpdatePostDto): string;
    remove(id: number): string;
}
