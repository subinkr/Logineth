import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ReqConnectWallet {
  @ApiProperty({ example: MockUserModel.swaggerUser.wallet })
  @IsString()
  wallet: string;
}
