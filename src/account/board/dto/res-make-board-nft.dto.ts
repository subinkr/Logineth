import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResMakeBoardNFT {
  @ApiProperty({ example: 'NFT 생성을 시작했습니다.' })
  @IsString()
  message: string;
}
