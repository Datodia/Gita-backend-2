"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const faker_1 = require("@faker-js/faker");
const aws_s3_service_1 = require("../aws-s3/aws-s3.service");
const crypto_1 = require("crypto");
let UsersService = class UsersService {
    awsS3Service;
    userModel;
    constructor(awsS3Service, userModel) {
        this.awsS3Service = awsS3Service;
        this.userModel = userModel;
    }
    async onModuleInit() {
        const usersCount = await this.userModel.countDocuments();
        console.log(usersCount, 'userCount');
        if (usersCount === 6) {
            let dataToInsert = [];
            for (let i = 0; i < 5000; i++) {
                dataToInsert.push({
                    fullName: faker_1.faker.person.fullName(),
                    age: faker_1.faker.number.int({ min: 15, max: 90 }),
                    email: `${i}${faker_1.faker.internet.email()}`,
                    password: faker_1.faker.person.fullName(),
                });
            }
            await this.userModel.insertMany(dataToInsert);
            console.log(`Inserted final batch of ${dataToInsert.length}`);
        }
    }
    async uploadUserPhoto(file) {
        const ext = file.mimetype.split('/')[1];
        const fileId = `images/${(0, crypto_1.randomUUID)()}.${ext}`;
        const result = await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype);
        return result;
    }
    async uploadMany(files) {
        const uploadedImages = [];
        for (let file of files) {
            const ext = file.mimetype.split('/')[1];
            const fileId = `images/${(0, crypto_1.randomUUID)()}.${ext}`;
            const result = await this.awsS3Service.uploadFile(fileId, file.buffer, file.mimetype);
            uploadedImages.push(result);
        }
        return uploadedImages;
    }
    async getFile(fileId) {
        const result = await this.awsS3Service.getFile(fileId);
        return result;
    }
    async deleteFile(fileId) {
        const result = await this.awsS3Service.deleteFile(fileId);
        return result;
    }
    findAll({ page, take }) {
        const skip = (page - 1) * take;
        return this.userModel
            .find({}, { fullName: 1, email: 1, age: 1, _id: 0 })
            .skip(skip)
            .limit(take);
    }
    async findOne(id) {
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        return user;
    }
    async update(id, updateUserDto) {
        console.log(updateUserDto, 'updateUserDto');
        const user = await this.userModel.findById(id);
        if (!user)
            throw new common_1.NotFoundException('user not found');
        if (updateUserDto.fullName)
            user.fullName = updateUserDto.fullName;
        if (updateUserDto.age)
            user.age = updateUserDto.age;
        if (updateUserDto.email)
            user.email = updateUserDto.email;
        return user.save();
    }
    async remove(id) {
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser)
            throw new common_1.NotFoundException('user not found');
        return deletedUser;
    }
    async addExpenseToUser(expenseId, userId) {
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { $push: { expenses: expenseId } }, { new: true });
        return updatedUser;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [aws_s3_service_1.AwsS3Service,
        mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map