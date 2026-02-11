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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const is_valid_object_id_dto_1 = require("../common/dto/is-valid-object-id.dto");
const pagination_dto_1 = require("./dto/pagination.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    uploadFile(file) {
        return this.usersService.uploadUserPhoto(file);
    }
    getFile(fileId) {
        return this.usersService.getFile(fileId);
    }
    uploadMany(files) {
        return this.usersService.uploadMany(files);
    }
    deleteImage(fileId) {
        return this.usersService.deleteFile(fileId);
    }
    findAll(queryParams) {
        return this.usersService.findAll(queryParams);
    }
    findOne({ id }) {
        return this.usersService.findOne(id);
    }
    update({ id }, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove({ id }) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('get-file'),
    __param(0, (0, common_1.Body)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getFile", null);
__decorate([
    (0, common_1.Post)('upload-many'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "uploadMany", null);
__decorate([
    (0, common_1.Delete)('user-image'),
    __param(0, (0, common_1.Body)('fileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "deleteImage", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiResponse)({
        status: 200,
        example: [
            {
                _id: '111111213123aaa',
                fullName: 'John Doe',
                email: 'john@gmail.com',
                age: 22,
                role: 'user',
                isMerried: true,
            },
        ],
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        example: 1,
        type: String,
        default: 1,
    }),
    (0, swagger_1.ApiQuery)({
        name: 'take',
        required: false,
        example: 30,
        type: String,
        default: 30,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [is_valid_object_id_dto_1.IsValidObjectId]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [is_valid_object_id_dto_1.IsValidObjectId,
        update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [is_valid_object_id_dto_1.IsValidObjectId]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map