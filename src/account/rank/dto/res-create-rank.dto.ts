import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResCreateRank {
  @ApiProperty({ example: '생성했습니다.' })
  @IsString()
  message: string;
}
