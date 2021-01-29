import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorService } from './doctor.service';
import { Repository, UpdateResult } from 'typeorm';

describe('DoctorService', () => {
  let service: DoctorService;
  let repository: Repository<Doctor>;
  let doctors: Doctor[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DoctorService>(DoctorService);
    repository = module.get<Repository<Doctor>>(getRepositoryToken(Doctor));

    doctors = new Array(5)
      .fill({
        name: '',
        crm: '',
        state: '',
        type: '',
      })
      .map((doctor, index) => Object.assign(doctor, { id: String(index) }));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create doctor', () => {
    const [expected] = doctors;

    jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

    const data = service.create(expected);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find all doctors', () => {
    const expected = doctors;

    jest.spyOn(repository, 'find').mockResolvedValueOnce(expected);

    const data = service.findAll();

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find one doctor', () => {
    const [expected] = doctors;

    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(expected);

    const data = service.findOne(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should update doctor', () => {
    const [expected] = doctors;

    jest.spyOn(repository, 'update').mockResolvedValueOnce({} as UpdateResult);
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = service.update(expected.id, expected);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should remove doctor', () => {
    const [expected] = doctors;

    jest.spyOn(repository, 'remove').mockResolvedValueOnce(expected);
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = service.remove(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });
});
