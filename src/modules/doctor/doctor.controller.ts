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
import { CreateDoctorsDto } from './dto/create-doctors.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ICreateDoctorUseCase } from './use-cases/create-doctor.use-case';
import { ICreateDoctorsUseCase } from './use-cases/create-doctors.use-case';
import { IRemoveDoctorUseCase } from './use-cases/delete-doctor.use-case';
import { IReadDoctorUseCase } from './use-cases/read-doctor.use-case';
import { IUpdateDoctorUseCase } from './use-cases/update-doctor.use-case';

@Controller('doctor')
export class DoctorController {
  constructor(
    @Inject('CreateDoctorUseCase')
    private readonly createUseCase: ICreateDoctorUseCase,
    @Inject('ReadDoctorUseCase')
    private readonly readUseCase: IReadDoctorUseCase,
    @Inject('UpdateDoctorUseCase')
    private readonly updateUseCase: IUpdateDoctorUseCase,
    @Inject('RemoveDoctorUseCase')
    private readonly removeUseCase: IRemoveDoctorUseCase,
    @Inject('CreateDoctorsUseCase')
    private readonly bulkUseCase: ICreateDoctorsUseCase,
  ) {}

  @Get()
  findAll() {
    return this.readUseCase.execute({});
  }

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.createUseCase.execute(createDoctorDto);
  }

  @Post('bulk')
  bulk(@Body() { doctors }: CreateDoctorsDto) {
    return this.bulkUseCase.execute(doctors);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.readUseCase.execute({ id });
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
