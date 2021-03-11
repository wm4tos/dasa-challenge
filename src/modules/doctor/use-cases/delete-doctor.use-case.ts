import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IUseCase } from 'src/modules/shared/interfaces/use-case.interface';

import { Doctor } from '../entities/doctor.entity';
import { Injectable } from '@nestjs/common';

export type Param = string;
export type Return = Promise<DeleteResult>;

export type IRemoveDoctorUseCase = IUseCase<Param, Return>;

@Injectable()
export class RemoveDoctorUseCase implements IRemoveDoctorUseCase {
  constructor(
    @InjectRepository(Doctor) private repository: Repository<Doctor>,
  ) {}

  execute(id: Param): Return {
    return this.repository.delete({ id });
  }
}
