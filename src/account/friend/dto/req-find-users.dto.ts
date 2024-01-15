import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqFindUsers {
  @ApiProperty({ example: `nickname#1` })
  @IsString()
  keyword: string;
}
