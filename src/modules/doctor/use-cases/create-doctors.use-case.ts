import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { IUseCase } from 'src/modules/shared/interfaces/use-case.interface';
import { Doctor } from '../entities/doctor.entity';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { Injectable } from '@nestjs/common';

type Param = CreateDoctorDto[];
type Saved = Doctor[];
type Return = Promise<Param | Saved>;

export type ICreateDoctorsUseCase = IUseCase<Param, Return>;

@Injectable()
export class CreateDoctorsUseCase implements ICreateDoctorsUseCase {
  constructor(@InjectConnection() private connection: Connection) {}

  async execute(doctors: Param): Return {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.startTransaction();

    const saved: Saved = [];

    try {
      for await (const doctor of doctors) {
        const doctorEntity = new Doctor();

        doctorEntity.crm = doctor.crm;
        doctorEntity.name = doctor.name;
        doctorEntity.state = doctor.state;
        doctorEntity.type = doctor.type;

        saved.push(await queryRunner.manager.save(doctorEntity));
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }

    return saved;
  }
}
