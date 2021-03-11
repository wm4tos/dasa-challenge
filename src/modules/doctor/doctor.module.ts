import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorController } from './doctor.controller';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorUseCase } from './use-cases/create-doctor.use-case';
import { UpdateDoctorUseCase } from './use-cases/update-doctor.use-case';
import { RemoveDoctorUseCase } from './use-cases/delete-doctor.use-case';
import { ReadDoctorUseCase } from './use-cases/read-doctor.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorController],
  providers: [
    CreateDoctorUseCase,
    UpdateDoctorUseCase,
    RemoveDoctorUseCase,
    ReadDoctorUseCase,
  ],
})
export class DoctorModule {}
