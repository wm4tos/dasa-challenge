import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { IUseCase } from 'src/modules/shared/interfaces/use-case.interface';

import { Doctor } from '../entities/doctor.entity';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { Injectable } from '@nestjs/common';

type Param = UpdateDoctorDto;
type Return = Promise<UpdateResult>;

export type IUpdateDoctorUseCase = IUseCase<Param, Return>;

@Injectable()
export class UpdateDoctorUseCase implements IUpdateDoctorUseCase {
  constructor(
    @InjectRepository(Doctor) private repository: Repository<Doctor>,
  ) {}

  execute(doctor: Param): Return {
    return this.repository.update(doctor.id, doctor);
  }
}
