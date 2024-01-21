import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ReqCreateRank {
  @ApiProperty({ example: 'title' })
  @MinLength(1)
  @IsString()
  title: string;
}
