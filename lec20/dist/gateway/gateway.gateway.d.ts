import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket } from 'socket.io';
import { User } from 'src/users/schema/users.schema';
export declare class GatewayGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userModel;
    constructor(userModel: Model<User>);
    private server;
    private onlineUsers;
    handleConnection(client: Socket, payload: any): void;
    handleDisconnect(client: Socket, ...args: any[]): void;
    handleOnline(client: Socket, payload: any): Promise<void>;
    handleMessage(client: Socket, payload: any): void;
    handlePublicMessage(client: Socket, payload: any): void;
    handleJoinRoom(client: Socket, rawPayload: any): void;
    handlePrivateMessage(client: Socket, rawPayload: any): void;
}
