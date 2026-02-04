import { UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Model } from 'mongoose';

import { Socket, Server } from 'socket.io'
import { SocketUserId } from 'src/decorators/socket-user-id.decorator';
import { UserId } from 'src/decorators/user-id.decorator';
import { IsAuthGuard } from 'src/guards/is-auth.guard';
import { SocketIsAuthGuard } from 'src/guards/socket-is-auth.guard';
import { User } from 'src/users/schema/users.schema';

@WebSocketGateway({
  cors: true
})
export class GatewayGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
  ){}

  @WebSocketServer()
  private server: Server

  private onlineUsers = {}

  handleConnection(client: Socket, payload: any) {
    console.log(`Connected ${client.id}`)
    this.server.emit('connection', `Connected ${client.id}`)
  }

  handleDisconnect(client: Socket, ...args: any[]) {
    const id = client.id
    delete this.onlineUsers[id]
    this.server.emit('online', this.onlineUsers)
    this.server.emit('disconnected', `Disconnected ${client.id}`)
  }

  @UseGuards(SocketIsAuthGuard)
  @SubscribeMessage('online')
  async handleOnline(client: Socket, payload: any){
    const userId = client.handshake.auth['userId']
    const user = await this.userModel.findById(userId)
    const id = client.id
    this.onlineUsers[id] = user

    this.server.emit('online', this.onlineUsers)
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {

    console.log(client.id, "client.id")
    console.log(payload, "payload")

    client.emit('message', payload)
  }


  @SubscribeMessage('PublicMessage')
  handlePublicMessage(client: Socket, payload){
    const id = client.id
    const user = this.onlineUsers[id]
    this.server.emit('PublicMessage', {
      message: payload,
      fullName: user.fullName,
      profilePic: user.profilePic,
      _id: user._id
    })

    // Send to everyone
    // this.server.emit('PublicMessage', payload)

  }

  @SubscribeMessage('JoinRoom')
  handleJoinRoom(client: Socket, rawPayload){
    const payload = JSON.parse(rawPayload)
    if(!payload.roomId) client.emit('JoinRoom', {error: "room Id is requeid"})

    client.join(payload.roomId)
    client.emit('JoinRoom', 'Joined successfully')
  }

  @SubscribeMessage('PrivateMessage')
  handlePrivateMessage(client: Socket, rawPayload){

    const payload = JSON.parse(rawPayload)
    if(!payload.roomId) client.emit('PrivateMessage', {error: "room Id is requeid"})
      console.log(payload, "payload")
    
    this.server.to(payload.roomId).emit('PrivateMessage', payload.message)
  }
}
