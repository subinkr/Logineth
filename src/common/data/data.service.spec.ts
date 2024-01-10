import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { providers } from 'src/source-code/mock/providers/providers';
import * as AWS from 'aws-sdk';
import { Readable } from 'typeorm/platform/PlatformTools';
import { ResUploadImageToS3 } from './dto/res-upload-image-to-s3.dto';

describe('DataService', () => {
  let service: DataService;
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
  const resUploadImageToS3: ResUploadImageToS3 = { image: '' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<DataService>(DataService);
  });

  // RBTEST: - use
  describe('Run Bucket', () => {
    const then = (callback: Function) => {
      return callback();
    };
    const promise = () => {
      return { then };
    };
    const bucket = {
      putObject() {
        return { promise };
      },
    };
    const params = {};

    it('Return | {image: string}', async () => {
      const result = await service.runBucket(bucket, params, emptyFile);
      expect(typeof result.image).toBe('string');
    });
  });

  // UITSTEST: - use
  describe('Upload Image To S3', () => {
    it('Use | runBucket', async () => {
      service.runBucket = jest.fn().mockReturnValue(resUploadImageToS3);
      await service.uploadImageToS3(emptyFile);
    });
  });
});
