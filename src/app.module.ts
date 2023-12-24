import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    CommonModule,
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
      entities: [],
      synchronize: true,
      ssl: process.env.DB_AWS_HOSTNAME && {
        rejectUnauthorized: false,
      },
    }),
    TypeOrmModule.forFeature([]),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
