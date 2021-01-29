import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty()
  @IsArray()
  exams: string[];

  @ApiProperty()
  @IsDateString()
  expirationDate: string | Date;
}
