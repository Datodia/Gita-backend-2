import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/post.entity").Post, {}, {}> & import("./entities/post.entity").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./entities/post.entity").Post, {}, {}> & import("./entities/post.entity").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./entities/post.entity").Post, {}, {}> & import("./entities/post.entity").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./entities/post.entity").Post, "find", {}>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./entities/post.entity").Post, {}, {}> & import("./entities/post.entity").Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updatePostDto: UpdatePostDto): string;
    remove(id: string): string;
}
