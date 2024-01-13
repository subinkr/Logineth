import { ChatModel } from 'src/source-code/entities/chat.entity';
import { defaultRoom } from './room.mock';
import { defaultUser } from './user.mock';

export const defaultChat: ChatModel = {
  id: 1,
  createdAt: new Date(1),
  updatedAt: new Date(1),
  content: 'content',
  room: defaultRoom,
  user: defaultUser,
};

export class MockChatModel {
  static chat: ChatModel = {
    ...defaultChat,
  };
  static chats: ChatModel[] = [MockChatModel.chat];

  save() {
    return defaultChat;
  }

  find() {
    return MockChatModel.chats;
  }

  findAndCount() {
    return [[], 0];
  }
}
