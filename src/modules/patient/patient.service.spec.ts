import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { PatientService } from './patient.service';
import { Repository, UpdateResult } from 'typeorm';

describe('PatientService', () => {
  let service: PatientService;
  let repository: Repository<Patient>;
  let patients: Patient[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<Repository<Patient>>(getRepositoryToken(Patient));

    patients = new Array(5)
      .fill({
        address: '',
        birthDate: '',
        cpf: '',
        email: '',
        gender: '',
        name: '',
        phone: '',
        rg: '',
      })
      .map((patient, index) => Object.assign(patient, { id: String(index) }));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create patient', () => {
    const [expected] = patients;

    jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

    const data = service.create(expected);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find all patients', () => {
    const expected = patients;

    jest.spyOn(repository, 'find').mockResolvedValueOnce(expected);

    const data = service.findAll();

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find one patient', () => {
    const [expected] = patients;

    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(expected);

    const data = service.findOne(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should update patient', () => {
    const [expected] = patients;

    jest.spyOn(repository, 'update').mockResolvedValueOnce({} as UpdateResult);
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = service.update(expected.id, expected);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should remove patient', () => {
    const [expected] = patients;

    jest.spyOn(repository, 'remove').mockResolvedValueOnce(expected);
    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = service.remove(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });
});
