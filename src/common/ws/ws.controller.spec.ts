import { Test, TestingModule } from '@nestjs/testing';
import { WsController } from './ws.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { WsService } from './ws.service';
import { ResGetChats } from './dto/res-get-chats.dto';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { MockRoomModel } from 'src/source-code/mock/entities/room.mock';
import { ResGetRooms } from './dto/res-get-rooms.dto';

describe('WsController', () => {
  let controller: WsController;
  let wsService: WsService;
  const { user } = MockUserModel;
  const { room } = MockRoomModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WsController],
      providers,
    }).compile();

    controller = module.get<WsController>(WsController);
    wsService = module.get<WsService>(WsService);
  });

  // GCTEST: - use, return
  describe('Get Chats', () => {
    const resGetChats: ResGetChats = {
      chats: [],
      chatsCount: 0,
      nextPage: false,
    };

    it('Use | getChats', async () => {
      wsService.getChats = jest.fn().mockReturnValue(resGetChats);
      await controller.getChats(room.id, 1, user.id);
      expect(wsService.getChats).toHaveBeenCalled();
    });

    it('Return | ResGetChats', async () => {
      const result = await controller.getChats(room.id, 1, user.id);
      expect(result).toBeInstanceOf(ResGetChats);

      const keys = Object.keys(result);
      const required = Object.keys(resGetChats);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // GRTEST: - use, return
  describe('Get Rooms', () => {
    const resGetRooms: ResGetRooms = { rooms: [MockRoomModel.room] };
    it('Use | getRooms', async () => {
      wsService.getRooms = jest.fn();
      await controller.getRooms(user.id);
      expect(wsService.getRooms).toHaveBeenCalled();
    });

    it('Return | ResGetRooms', async () => {
      const result = await controller.getRooms(user.id);
      expect(result).toBeInstanceOf(ResGetRooms);

      const keys = Object.keys(result);
      const required = Object.keys(resGetRooms);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
