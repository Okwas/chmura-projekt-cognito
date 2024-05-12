import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { ConnectedSocket } from '@nestjs/websockets';
import { GameService } from './game.service';
import { DISCONNECT, JOIN_GAME, MOVE } from '../../../socket.messages';
import JoinDto from '../../../dto/game/join.input.dto';
import MoveInputDto from '../../../dto/game/move.input.dto';
import AuthService from 'src/auth/auth.service';

@WebSocketGateway(3001, { cors: { origin: true } })
export class GameGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly gameService: GameService,
    private readonly authService: AuthService,
  ) {}

  handleConnection(client: any, ...args: any[]) {
    console.log('connected');
  }
  afterInit(server: any) {
    server.use(async (socket, next) => {
      const accessToken = socket.handshake.query.accessToken;
      if (!accessToken) {
        return next(new Error('Unauthorized'));
      }
      console.log(accessToken);
      const user = await this.authService.userFromJwt(accessToken as string);
      if (!user) {
        return next(new Error('Unauthorized'));
      }
      socket.handshake.auth = user;
      socket.handshake.auth.userId = user.UserAttributes.find(
        (attr) => attr.Name === 'email',
      ).Value;
      next();
    });
  }

  @SubscribeMessage(JOIN_GAME)
  handleJoinGame(
    @MessageBody() data: JoinDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.gameService.join(
      {
        ...data,
        socketId: client.id,
      },
      this.server,
    );
  }

  @SubscribeMessage(MOVE)
  handleMove(
    @MessageBody() data: MoveInputDto,
    @ConnectedSocket() client: Socket,
  ): void {
    this.gameService.move(
      {
        ...data,
        socketId: client.id,
      },
      this.server,
    );
  }

  @SubscribeMessage(DISCONNECT)
  handleDisconnect(@ConnectedSocket() client: Socket): void {
    this.gameService.disconnect(client.id, this.server);
  }
}
