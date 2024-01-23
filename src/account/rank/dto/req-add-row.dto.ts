import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqAddRow {
  @ApiProperty({ example: 'content' })
  @IsString()
  content: string;
}
