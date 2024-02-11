import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { BoardModel } from 'src/source-code/entities/board.entity';
import { MockBoardModel } from 'src/source-code/mock/entities/board.mock';

export class ResGetBoards {
  @ApiProperty({ example: [], required: false })
  boards: BoardModel[];

  @ApiProperty({ example: 0, required: false })
  @IsNumber()
  boardsCount: number;

  @ApiProperty({ example: false, required: false })
  nextPage: number | boolean;
}
