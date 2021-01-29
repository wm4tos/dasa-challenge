import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  crm: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  type: string;
}
