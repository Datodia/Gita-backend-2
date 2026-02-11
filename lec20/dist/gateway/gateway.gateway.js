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
exports.GatewayGateway = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const websockets_1 = require("@nestjs/websockets");
const mongoose_2 = require("mongoose");
const socket_io_1 = require("socket.io");
const socket_is_auth_guard_1 = require("../guards/socket-is-auth.guard");
let GatewayGateway = class GatewayGateway {
    userModel;
    constructor(userModel) {
        this.userModel = userModel;
    }
    server;
    onlineUsers = {};
    handleConnection(client, payload) {
        console.log(`Connected ${client.id}`);
        this.server.emit('connection', `Connected ${client.id}`);
    }
    handleDisconnect(client, ...args) {
        const id = client.id;
        delete this.onlineUsers[id];
        this.server.emit('online', this.onlineUsers);
        this.server.emit('disconnected', `Disconnected ${client.id}`);
    }
    async handleOnline(client, payload) {
        const userId = client.handshake.auth['userId'];
        const user = await this.userModel.findById(userId);
        const id = client.id;
        this.onlineUsers[id] = user;
        this.server.emit('online', this.onlineUsers);
    }
    handleMessage(client, payload) {
        console.log(client.id, "client.id");
        console.log(payload, "payload");
        client.emit('message', payload);
    }
    handlePublicMessage(client, payload) {
        const id = client.id;
        const user = this.onlineUsers[id];
        this.server.emit('PublicMessage', {
            message: payload,
            fullName: user.fullName,
            profilePic: user.profilePic,
            _id: user._id
        });
    }
    handleJoinRoom(client, rawPayload) {
        const payload = JSON.parse(rawPayload);
        if (!payload.roomId)
            client.emit('JoinRoom', { error: "room Id is requeid" });
        client.join(payload.roomId);
        client.emit('JoinRoom', 'Joined successfully');
    }
    handlePrivateMessage(client, rawPayload) {
        const payload = JSON.parse(rawPayload);
        if (!payload.roomId)
            client.emit('PrivateMessage', { error: "room Id is requeid" });
        console.log(payload, "payload");
        this.server.to(payload.roomId).emit('PrivateMessage', payload.message);
    }
};
exports.GatewayGateway = GatewayGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GatewayGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UseGuards)(socket_is_auth_guard_1.SocketIsAuthGuard),
    (0, websockets_1.SubscribeMessage)('online'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], GatewayGateway.prototype, "handleOnline", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('PublicMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "handlePublicMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('PrivateMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], GatewayGateway.prototype, "handlePrivateMessage", null);
exports.GatewayGateway = GatewayGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true
    }),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GatewayGateway);
//# sourceMappingURL=gateway.gateway.js.map