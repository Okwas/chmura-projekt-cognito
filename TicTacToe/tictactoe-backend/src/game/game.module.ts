import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { QueueModule } from 'src/queue/queue.module';
import { SessionModule } from 'src/session/session.module';
import AuthModule from 'src/auth/auth.module';

@Module({
  imports: [QueueModule, SessionModule, AuthModule],
  providers: [GameService, GameGateway],
})
export class GameModule {}
