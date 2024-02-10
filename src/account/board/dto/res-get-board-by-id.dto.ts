import { ApiProperty } from '@nestjs/swagger';
import { BoardModel } from 'src/source-code/entities/board.entity';
import { MockBoardModel } from 'src/source-code/mock/entities/board.mock';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

export class ResGetBoardByID {
  @ApiProperty({
    example: {
      id: MockBoardModel.board.id,
      name: MockBoardModel.board.name,
      description: MockBoardModel.board.description,
      image: MockBoardModel.board.image,
      tokenID: MockBoardModel.board.tokenID,
      ad: MockBoardModel.board.ad,
      __originalAuthor__: {
        id: MockUserModel.user.id,
        username: MockUserModel.user.username,
        nickname: MockUserModel.user.nickname,
      },
      __owner__: null,
    },
    required: false,
  })
  board: BoardModel;
}
