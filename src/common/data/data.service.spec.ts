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

  // RITEST: - return
  describe('Return Image', () => {
    it('Return | {image: string}', () => {
      const result = service.returnImage(emptyFile);
      const keys = Object.keys(result);
      const required = Object.keys(resUploadImageToS3);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // RBTEST: - use
  describe('Run Bucket', () => {
    const then = () => {
      return service.returnImage(emptyFile);
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

    it('Use | returnImage', async () => {
      service.returnImage = jest.fn().mockReturnValue(resUploadImageToS3);
      await service.runBucket(bucket, params, emptyFile);
      expect(service.returnImage).toHaveBeenCalled();
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
