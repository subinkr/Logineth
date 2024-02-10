import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { UserModel } from './source-code/entities/user.entity';
import { RoomModel } from './source-code/entities/room.entity';
import { ChatModel } from './source-code/entities/chat.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RankModel } from './source-code/entities/rank.entity';
import { RankRowModel } from './source-code/entities/rank-row.entity';
import { BoardModel } from './source-code/entities/board.entity';

@Module({
  imports: [
    CommonModule,
    AccountModule,
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_AWS_HOSTNAME || process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        UserModel,
        RoomModel,
        ChatModel,
        RankModel,
        RankRowModel,
        BoardModel,
      ],
      synchronize: true,
      ssl: process.env.DB_AWS_HOSTNAME && {
        rejectUnauthorized: false,
      },
    }),
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
