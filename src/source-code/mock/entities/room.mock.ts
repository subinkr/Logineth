import { RoomModel } from 'src/source-code/entities/room.entity';
import { lazyArray } from '../common/lazyArray';
import { ChatModel } from 'src/source-code/entities/chat.entity';
import { defaultUser } from './user.mock';
import { defaultChat } from './chat.mock';

export const defaultRoom: RoomModel = {
  id: 1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  name: '1-1004',
  chats: lazyArray<ChatModel>([defaultChat]),
  users: [],
  viewUsers: [],
};

export class MockRoomModel {
  static room: RoomModel = { ...defaultRoom };

  create() {
    return defaultRoom;
  }

  findOne() {
    return {
      ...defaultRoom,
      users: [defaultUser, defaultUser],
    };
  }

  save() {}

  delete() {}
}
