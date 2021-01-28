import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  birthDate: string;

  @Column({ nullable: true })
  gender: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  cpf: string;

  @Column()
  rg: string;
}
