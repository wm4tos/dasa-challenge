import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';

describe('DoctorController', () => {
  let controller: DoctorController;
  let service: DoctorService;
  let doctors: Doctor[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorController],
      providers: [
        DoctorService,
        {
          provide: getRepositoryToken(Doctor),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<DoctorController>(DoctorController);
    service = module.get<DoctorService>(DoctorService);

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
    expect(controller).toBeDefined();
  });

  it('should find all doctors', () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(doctors);

    const data = controller.findAll();

    expect(data).resolves.toStrictEqual(doctors);
  });

  it('should create doctor', () => {
    const [expected] = doctors;

    jest.spyOn(service, 'create').mockResolvedValueOnce(expected);

    const data = controller.create(expected as CreateDoctorDto);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should find one doctor', () => {
    const [expected] = doctors;

    jest.spyOn(service, 'findOne').mockResolvedValueOnce(expected);

    const data = controller.findOne(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should update doctor', () => {
    const [expected] = doctors;

    jest.spyOn(service, 'update').mockResolvedValueOnce(expected);

    const data = controller.update(expected.id, expected as UpdateDoctorDto);

    expect(data).resolves.toStrictEqual(expected);
  });

  it('should remove doctor', () => {
    const [expected] = doctors;

    jest.spyOn(service, 'remove').mockResolvedValueOnce(expected);

    const data = controller.remove(expected.id);

    expect(data).resolves.toStrictEqual(expected);
  });
});
