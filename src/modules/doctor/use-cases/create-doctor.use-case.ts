import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUseCase } from 'src/modules/shared/interfaces/use-case.interface';

import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { Injectable } from '@nestjs/common';

type Param = CreateDoctorDto;
type Return = Promise<Param & Doctor>;

export type ICreateDoctorUseCase = IUseCase<Param, Return>;

@Injectable()
export class CreateDoctorUseCase implements ICreateDoctorUseCase {
  constructor(
    @InjectRepository(Doctor) private repository: Repository<Doctor>,
  ) {}

  execute(doctor: Param): Return {
    return this.repository.save(doctor);
  }
}
