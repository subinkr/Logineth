import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResEditAd {
  @ApiProperty({ example: '광고가 수정되었습니다.' })
  @IsString()
  message: string;
}
