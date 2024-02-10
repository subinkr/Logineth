import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResCompleteMakeBoardNFT {
  @ApiProperty({ example: 'NFT 생성이 완료되었습니다.' })
  @IsString()
  message: string;
}
