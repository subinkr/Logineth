import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqLanguage {
  @ApiProperty({ example: 0 })
  @IsNumber()
  language: number;
}
