
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({
    default: 0
  })
  coins: number;

  @Column({
    default: 1
  })
  level: number;


  @Column('text')
  gameData: string;

}
