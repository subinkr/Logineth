import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResDeleteBoard {
  @ApiProperty({ example: '글을 삭제했습니다.' })
  @IsString()
  message: string;
}
