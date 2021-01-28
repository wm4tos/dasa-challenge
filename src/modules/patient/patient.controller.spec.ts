import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;
  let patients: Patient[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);

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
    expect(controller).toBeDefined();
  });

  it('should find all patients', () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(patients);

    const data = controller.findAll();

    expect(data).resolves.toStrictEqual(patients);
  });

  it('should create patient', () => {
    const [expected] = patients;

    jest.spyOn(service, 'create').mockResolvedValueOnce(expected);

    const data = controller.create(expected as CreatePatientDto);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find one patient', () => {
    const [expected] = patients;

    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = controller.findOne(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should update patient', () => {
    const [expected] = patients;

    jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

    const data = controller.update(expected.id, expected as UpdatePatientDto);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should remove patient', () => {
    const [expected] = patients;

    jest.spyOn(service, 'remove').mockResolvedValueOnce(expected);

    const data = controller.remove(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });
});
