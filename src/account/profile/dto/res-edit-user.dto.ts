import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResEditUser {
  @ApiProperty({ example: '수정되었습니다.' })
  @IsString()
  message: string;
}
