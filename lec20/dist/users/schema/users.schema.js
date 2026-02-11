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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const role_enum_1 = require("../../enum/role.enum");
let Address = class Address {
    home;
    work;
};
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Address.prototype, "home", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Address.prototype, "work", void 0);
Address = __decorate([
    (0, mongoose_1.Schema)({
        _id: false
    })
], Address);
const addressSchema = mongoose_1.SchemaFactory.createForClass(Address);
let User = class User {
    fullName;
    email;
    password;
    age;
    expenses;
    role;
    isMerried;
    isVerfied;
    OTPCode;
    OTPCodeExpirationDate;
    profilePic;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        select: false
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        index: true
    }),
    __metadata("design:type", Number)
], User.prototype, "age", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [mongoose_2.default.Types.ObjectId],
        ref: "expense",
        default: []
    }),
    __metadata("design:type", Array)
], User.prototype, "expenses", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: role_enum_1.Role,
        default: role_enum_1.Role.VIEWER
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isMerried", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerfied", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "OTPCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "OTPCodeExpirationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String
    }),
    __metadata("design:type", String)
], User.prototype, "profilePic", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], User);
exports.userModel = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=users.schema.js.map