import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ICreateDoctorUseCase } from './use-cases/create-doctor.use-case';
import { IRemoveDoctorUseCase } from './use-cases/delete-doctor.use-case';
import { IReadDoctorUseCase } from './use-cases/read-doctor.use-case';
import { IUpdateDoctorUseCase } from './use-cases/update-doctor.use-case';

type Create = ICreateDoctorUseCase;
type Read = IReadDoctorUseCase;
type Update = IUpdateDoctorUseCase;
type Remove = IRemoveDoctorUseCase;

@Controller('doctor')
export class DoctorController {
  constructor(
    @Inject('CreateDoctorUseCase') private readonly createUseCase: Create,
    @Inject('UpdateDoctorUseCase') private readonly updateUseCase: Update,
    @Inject('RemoveDoctorUseCase') private readonly removeUseCase: Remove,
    @Inject('ReadDoctorUseCase') private readonly readUseCase: Read,
  ) {}

  @Get()
  findAll() {
    return this.readUseCase.execute({});
  }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.createUseCase.execute(createDoctorDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const doctor = await this.readUseCase.execute({ id });

    return doctor;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.updateUseCase.execute(Object.assign(updateDoctorDto, { id }));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeUseCase.execute(id);
  }
}
