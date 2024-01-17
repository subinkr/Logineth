import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';
import { providers } from 'src/source-code/mock/providers/providers';
import { Readable } from 'typeorm/platform/PlatformTools';
import { ResUploadImageToS3 } from './dto/res-upload-image-to-s3.dto';
import { UserModel } from 'src/source-code/entities/user.entity';
import { MockUserModel } from 'src/source-code/mock/entities/user.mock';

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
  const { user, otherUser } = MockUserModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers,
    }).compile();

    service = module.get<DataService>(DataService);
  });

  // RBTEST: - return
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

  // UITSTEST: - use, return
  describe('Upload Image To S3', () => {
    const resUploadImageToS3: ResUploadImageToS3 = { image: '' };
    let result = {};

    it('Use | runBucket', async () => {
      service.runBucket = jest.fn().mockReturnValue(resUploadImageToS3);
      result = await service.uploadImageToS3(emptyFile);
    });

    it('Return | ResUploadImageToS3', async () => {
      const keys = Object.keys(result);
      const required = Object.keys(resUploadImageToS3);
      expect(keys).toEqual(expect.arrayContaining(required));
    });
  });

  // LTEST: - use, return
  describe('Language', () => {
    it.todo('Use | getUserByID');
    it.todo('return | ResLanguage');
  });

  //PTEST: - return
  describe('Pagination', () => {
    const findAndCount: [UserModel[], number] = [[user, otherUser], 2];
    const [take, skip, page] = [1, 0, 1];

    it('Return | {array: [], arrayCount: number, nextPage: number | boolean}', () => {
      const result = service.pagination(findAndCount, skip, take, page);
      const { array, arrayCount, nextPage } = result;

      expect(array).toStrictEqual(findAndCount[0]);
      expect(arrayCount).toEqual(findAndCount[1]);
      expect(nextPage).toEqual(skip + take < arrayCount && page + 1);
      expect(skip + (take + 1) < arrayCount && page + 1).toBeFalsy();
    });
  });
});
