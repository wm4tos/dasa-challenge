import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor) private repository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    return this.repository.save(createDoctorDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.repository.update(id, updateDoctorDto);

    return this.findOne(id);
  }

  async remove(id: string) {
    const doctor = await this.findOne(id);

    return this.repository.remove(doctor);
  }
}
