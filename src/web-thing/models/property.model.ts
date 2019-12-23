import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { Thing } from '.';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    nullable: true
  })
  title: string;

  @Column({
    length: 100,
    nullable: true
  })
  description?: string;

  @Column({
    length: 50,
    nullable: false
  })
  '@type': string;

  @Column({
    length: 50,
    nullable: false
  })
  type: string;

  @Column({
    length: 50,
    nullable: false
  })
  alias: string;

  @Column({
    nullable: false
  })
  thingId: number;

  @ManyToOne(type => Thing, thing => thing.properties)
  thing: Thing;
}
