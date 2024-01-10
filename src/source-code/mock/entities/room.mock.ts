import { RoomModel } from 'src/source-code/entities/room.entity';
import { lazyArray } from '../common/lazyArray';
import { UserModel } from 'src/source-code/entities/user.entity';
import { ChatModel } from 'src/source-code/entities/chat.entity';

export class MockRoomModel {
  static defaultRoom: RoomModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    name: '1-1004',
    chats: lazyArray<ChatModel>(),
    users: lazyArray<UserModel>(),
  };

  static room: RoomModel = {
    ...this.defaultRoom,
  };
}
