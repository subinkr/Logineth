import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResUnFollowing {
  @ApiProperty({ example: '언팔로우 성공' })
  @IsString()
  message: string;
}
