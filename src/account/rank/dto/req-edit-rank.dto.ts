import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqEditRank {
  @ApiProperty({ example: 'New title' })
  @IsString()
  title: string;

  @ApiProperty({ example: '6/2/9' })
  @IsString()
  ranking: string;
}
