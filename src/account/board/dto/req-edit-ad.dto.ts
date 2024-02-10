import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqEditAd {
  @ApiProperty({ example: '새로운 광고입니다.' })
  @IsString()
  ad: string;
}
