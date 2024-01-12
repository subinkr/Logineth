import { RoomModel } from 'src/source-code/entities/room.entity';
import { lazyArray } from '../common/lazyArray';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { MockUserModel } from './user.mock';

export class MockRoomModel {
  defaultRoom: RoomModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    name: '1-1004',
    chats: lazyArray<ChatModel>(),
    users: [],
  };

  static room: RoomModel = {
    ...new MockRoomModel().defaultRoom,
  };

  create() {
    return new MockRoomModel().defaultRoom;
  }

  save() {}

  delete() {}
}
