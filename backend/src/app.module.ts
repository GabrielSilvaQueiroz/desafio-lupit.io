import { Module } from '@nestjs/common';
import { TeamsModule } from './modules/teams/teams.module';
import { PlayersModule } from './modules/players/players.module';


@Module({
  imports: [TeamsModule, PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
