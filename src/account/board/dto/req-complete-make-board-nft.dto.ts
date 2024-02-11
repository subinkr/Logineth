import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqCompleteMakeBoardNFT {
  @ApiProperty({ example: 1 })
  @IsNumber()
  tokenID: number;
}
