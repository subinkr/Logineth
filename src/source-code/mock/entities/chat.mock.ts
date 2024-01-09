import { ChatModel } from 'src/source-code/entities/chat.entity';
import { MockRoomModel } from './room.mock';
import { MockUserModel } from './user.mock';

export class MockChatModel {
  static defaultChat: ChatModel = {
    id: 1,
    createdAt: new Date(1),
    updatedAt: new Date(1),
    content: 'content',
    room: MockRoomModel.room,
    user: MockUserModel.user,
  };

  static chat: ChatModel = {
    ...this.defaultChat,
  };
  static chats: ChatModel[] = [MockChatModel.chat];
}
