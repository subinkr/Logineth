import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { WsService } from './ws.service';
import { Server, Socket } from 'socket.io';
import { RoomGatewaySendMessage } from './dto/room-gateway-send-message.dto';

@WebSocketGateway({
  secure: true,
  namespace: /room\/*/,
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'https://logineth.subin.kr'],
  },
})
export class RoomGateway {
  constructor(private readonly wsService: WsService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() data: RoomGatewaySendMessage,
    @ConnectedSocket() socket: Socket,
  ) {
    const roomID: number = parseInt(socket.nsp.name.split('/').slice(-1)[0]);
    const { chat } = await this.wsService.sendMessage(data, roomID);
    socket.broadcast.emit(`${roomID}`, chat);
  }
}
