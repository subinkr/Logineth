import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { MockBoardModel } from 'src/source-code/mock/entities/board.mock';

export class ReqPostBoard {
  @ApiProperty({ example: MockBoardModel.board.name })
  @IsString()
  @MinLength(1)
  name: string;
  @ApiProperty({ example: MockBoardModel.board.description })
  @IsString()
  @MinLength(1)
  description: string;
  @ApiProperty({ example: MockBoardModel.board.image })
  @IsString()
  @MinLength(1)
  image: string;
}
