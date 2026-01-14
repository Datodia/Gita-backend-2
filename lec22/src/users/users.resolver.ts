import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { UserPayload } from "./payload/user.payload";
import { CreateUserInput } from "./dto/create-user.input";

@Resolver()
export class UsersResolver {
    constructor(
        private usersService: UsersService
    ){}

    @Query(() => [UserPayload])
    getAllUsers(){
        return this.usersService.getAll()
    }

    @Mutation(() => UserPayload)
    createUser(@Args('CreateUserInput') createUserInput: CreateUserInput){
        return this.usersService.createUser(createUserInput)
    }

}