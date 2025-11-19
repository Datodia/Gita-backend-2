import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.interface";

@Injectable()
export class UsersService {
    private users = [
        {id: 1, name: 'nika', age: 22},
        {id: 2, name: 'giorgi', age: 24},
    ]

    getAllUsers(): User[]{
        return this.users
    }

    createUser({name, age}: CreateUserDto): User{
        if(!name || !age) {
            throw new HttpException('email and age is requied', HttpStatus.BAD_REQUEST)
        }

        const lastId = this.users[this.users.length - 1]?.id || 0
        const newUser = {
            id: lastId + 1,
            name, 
            age
        }

        this.users.push(newUser)

        return newUser
    }

    getUserById(userId: number): User{
        const user = this.users.find(el => el.id === userId)
        if(!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    deleteUserById(userId: number){
        const userIndex = this.users.findIndex(u => u.id === userId)
        if(userIndex === -1){
            throw new NotFoundException('User not found')
        }

        const [deletedUser] = this.users.splice(userIndex, 1)

        return deletedUser
    }

    updateUserById(userId: number, updateUserDto: UpdateUserDto){
        const userIndex = this.users.findIndex(u => u.id === userId)
        if(userIndex === -1){
            throw new NotFoundException('User not found')
        }

        const updateReq = {}
        if(updateUserDto.name) updateReq['name'] = updateUserDto.name
        if(updateUserDto.age) updateReq['age'] = updateUserDto.age

        this.users[userIndex] = {
            ...this.users[userIndex],
            ...updateReq
        }

        return this.users[userIndex]
    }

}