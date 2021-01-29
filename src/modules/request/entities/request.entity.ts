import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array', { default: null })
  exams: string[];

  @Column('date')
  expirationDate: Date;
}
