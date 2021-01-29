import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request) private repository: Repository<Request>,
  ) {}

  static format({
    expirationDate,
    exams,
  }: CreateRequestDto | UpdateRequestDto): Partial<Request> {
    return { expirationDate: new Date(expirationDate), exams };
  }

  async create(createRequestDto: CreateRequestDto) {
    return this.repository.save(RequestService.format(createRequestDto));
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  async update(id: string, updateRequestDto: UpdateRequestDto) {
    await this.repository.update(id, RequestService.format(updateRequestDto));

    return this.findOne(id);
  }

  async remove(id: string) {
    const request = await this.findOne(id);

    return this.repository.remove(request);
  }
}
