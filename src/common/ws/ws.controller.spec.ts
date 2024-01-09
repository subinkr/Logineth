import { Test, TestingModule } from '@nestjs/testing';
import { WsController } from './ws.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { WsService } from './ws.service';
import { ResGetRoom } from './dto/res-get-room.dto';
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

  describe('Get Room', () => {
    const resGetRoom: ResGetRoom = { chats: [] };

    it('Use | getRoom', async () => {
      wsService.getRoom = jest.fn().mockReturnValue(resGetRoom);
      await controller.getRoom(room.id, 1, user.id);
      expect(wsService.getRoom).toHaveBeenCalled();
    });

    it('Return | ResGetRoom', async () => {
      const result = await controller.getRoom(room.id, 1, user.id);
      expect(result).toBeInstanceOf(ResGetRoom);

      const keys = Object.keys(result);
      const required = Object.keys(resGetRoom);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });
});
