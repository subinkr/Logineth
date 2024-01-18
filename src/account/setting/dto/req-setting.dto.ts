import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqSetting {
  @ApiProperty({ example: 0 })
  @IsNumber()
  setting: number;
}
