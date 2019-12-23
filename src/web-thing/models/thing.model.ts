import { Property } from './property.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Thing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'simple-array',
    nullable: false
  })
  type: string[];

  @Column({
    length: 50,
    nullable: false
  })
  title: string;

  @Column({
    length: 50,
    nullable: false
  })
  alias: string;

  @Column({
    length: 100,
    nullable: true
  })
  description?: string;

  @Column({
    type: 'jsonb',
    nullable: false
  })
  value: object;

  @OneToMany(type => Property, property => property.thing)
  properties: Property[];
}
