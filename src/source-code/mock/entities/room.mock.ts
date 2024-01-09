import { RoomModel } from 'src/source-code/entities/room.entity';
import { lazyArray } from '../common/lazyArray';

export class MockRoomModel {
  static defaultRoomAttributes: RoomModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    chats: lazyArray(),
    users: lazyArray(),
  };

  static room: RoomModel = {
    ...this.defaultRoomAttributes,
  };
}
