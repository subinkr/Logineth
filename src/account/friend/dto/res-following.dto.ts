import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResFollowing {
  @ApiProperty({ example: '팔로우 성공' })
  @IsString()
  message: string;
}
