import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUseCase } from 'src/modules/shared/interfaces/use-case.interface';

import { Doctor } from '../entities/doctor.entity';
import { Injectable } from '@nestjs/common';

type Param = Partial<Doctor>;
type Return = Promise<Doctor | Doctor[]>;

export type IReadDoctorUseCase = IUseCase<Param, Return>;

@Injectable()
export class ReadDoctorUseCase implements IReadDoctorUseCase {
  constructor(
    @InjectRepository(Doctor) private repository: Repository<Doctor>,
  ) {}

  execute(where: Param = {}): Return {
    return this.repository.find({ where });
  }
}
