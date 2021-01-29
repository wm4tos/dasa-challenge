import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';

describe('RequestController', () => {
  let controller: RequestController;
  let service: RequestService;
  let requests: Request[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [
        RequestService,
        {
          provide: getRepositoryToken(Request),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<RequestController>(RequestController);
    service = module.get<RequestService>(RequestService);

    requests = new Array(5)
      .fill({        exams: [],
        expirationDate: '2021-01-29T16:02:19.644Z',
      })
      .map((request, index) => Object.assign(request, { id: String(index) }));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all requests', () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(requests);

    const data = controller.findAll();

    expect(data).resolves.toStrictEqual(requests);
  });

  it('should create request', () => {
    const [expected] = requests;

    jest.spyOn(service, 'create').mockResolvedValueOnce(expected);

    const data = controller.create(expected as CreateRequestDto);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find one request', () => {
    const [expected] = requests;

    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = controller.findOne(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should update request', () => {
    const [expected] = requests;

    jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

    const data = controller.update(expected.id, expected as UpdateRequestDto);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should remove request', () => {
    const [expected] = requests;

    jest.spyOn(service, 'remove').mockResolvedValueOnce(expected);

    const data = controller.remove(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });
});
