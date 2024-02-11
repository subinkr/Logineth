import { ApiProperty } from '@nestjs/swagger';
import { IsInstance } from 'class-validator';
import { BoardModel } from 'src/source-code/entities/board.entity';
import { MockBoardModel } from 'src/source-code/mock/entities/board.mock';

export class ResPostBoard {
  @ApiProperty({ example: MockBoardModel.board, required: false })
  @IsInstance(BoardModel)
  board: BoardModel;
}
