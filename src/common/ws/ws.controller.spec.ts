import { Test, TestingModule } from '@nestjs/testing';
import { WsController } from './ws.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { WsService } from './ws.service';
import { ResGetRoom } from './dto/res-get-room.dto';
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

  // GRTEST: - use, return
  describe('Get Room', () => {
    const resGetRoom: ResGetRoom = {
      chats: [],
      chatsCount: 0,
      nextPage: false,
    };

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
