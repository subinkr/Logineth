import { ApiProperty } from '@nestjs/swagger';
import { RoomModel } from 'src/source-code/entities/room.entity';
import { MockRoomModel } from 'src/source-code/mock/entities/room.mock';

export class ResGetRooms {
  @ApiProperty({ example: [MockRoomModel.room] })
  rooms: RoomModel[];
}
