import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestService } from './request.service';
import { Repository, UpdateResult } from 'typeorm';

describe('RequestService', () => {
  let service: RequestService;
  let repository: Repository<Request>;
  let requests: Request[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RequestService,
        {
          provide: getRepositoryToken(Request),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RequestService>(RequestService);
    repository = module.get<Repository<Request>>(getRepositoryToken(Request));

    requests = new Array(5)
      .fill({ exams: [], expirationDate: '2021-01-29T16:02:19.644Z' })
      .map((request, index) => Object.assign(request, { id: String(index) }));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create request', () => {
    const [expected] = requests;

    jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

    const data = service.create(expected);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find all requests', () => {
    const expected = requests;

    jest.spyOn(repository, 'find').mockResolvedValueOnce(expected);

    const data = service.findAll();

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find one request', () => {
    const [expected] = requests;

    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(expected);

    const data = service.findOne(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should update request', () => {
    const [expected] = requests;

    jest.spyOn(repository, 'update').mockResolvedValueOnce({} as UpdateResult);
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = service.update(expected.id, expected);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should remove request', () => {
    const [expected] = requests;

    jest.spyOn(repository, 'remove').mockResolvedValueOnce(expected);
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = service.remove(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should format request', () => {
    const [expected] = requests;

    const data = RequestService.format(expected);

    expect(data.expirationDate).toBeInstanceOf(Date);
  });
});
