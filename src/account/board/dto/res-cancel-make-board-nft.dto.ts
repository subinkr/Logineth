import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResCancelMakeBoardNFT {
  @ApiProperty({ example: 'NFT 생성이 취소되었습니다.' })
  @IsString()
  message: string;
}
