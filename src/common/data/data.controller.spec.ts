import { Test, TestingModule } from '@nestjs/testing';
import { DataController } from './data.controller';
import { providers } from 'src/source-code/mock/providers/providers';
import { DataService } from './data.service';
import { ResUploadImageToS3 } from './dto/res-upload-image-to-s3.dto';
import { Readable } from 'typeorm/platform/PlatformTools';

describe('DataController', () => {
  let controller: DataController;
  let dataService: DataService;
  const emptyFile = {
    fieldname: '',
    originalname: '',
    encoding: '',
    mimetype: '',
    size: 1,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
    buffer: Buffer.alloc(1),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataController],
      providers,
    }).compile();

    controller = module.get<DataController>(DataController);
    dataService = module.get<DataService>(DataService);
  });

  describe('Upload Image To S3', () => {
    it('Use | uploadImageToS3', async () => {
      const resUploadImageToS3: ResUploadImageToS3 = { image: '' };

      dataService.uploadImageToS3 = jest
        .fn()
        .mockReturnValue(resUploadImageToS3);
      await controller.uploadImageToS3(emptyFile);
      expect(dataService.uploadImageToS3).toHaveBeenCalled();
    });
  });

  describe('Language', () => {
    it.todo('Use | language');
  });
});
