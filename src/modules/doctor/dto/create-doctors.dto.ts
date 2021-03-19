import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateDoctorDto } from './create-doctor.dto';

export class CreateDoctorsDto {
  @ApiProperty({ type: [CreateDoctorDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDoctorDto)
  doctors: CreateDoctorDto[];
}
