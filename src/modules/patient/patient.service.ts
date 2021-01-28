import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private repository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    return this.repository.save(createPatientDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.repository.update(id, updatePatientDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const patient = await this.findOne(id);

    return this.repository.remove(patient);
  }
}
