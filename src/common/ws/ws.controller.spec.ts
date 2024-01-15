import { Test, TestingModule } from '@nestjs/testing';
import { WsController } from './ws.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { WsService } from './ws.service';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';
import { MockRoomModel } from 'src/source-code/mock/entities/room.mock';

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

  // GCTEST: - use
  describe('Get Chats', () => {
    it('Use | getChats', async () => {
      wsService.getChats = jest.fn();
      await controller.getChats(room.id, 1, user.id);
      expect(wsService.getChats).toHaveBeenCalled();
    });
  });

  // GRTEST: - use
  describe('Get Rooms', () => {
    it('Use | getRooms', async () => {
      wsService.getRooms = jest.fn();
      await controller.getRooms(user.id);
      expect(wsService.getRooms).toHaveBeenCalled();
    });
  });
});
