import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({ type: 'integer', default: null })
  parentId: number;

  @OneToMany(() => MenuItem, (MenuItem) => MenuItem.parent)
  children: MenuItem[]

  @ManyToOne(() => MenuItem, (MenuItem) => MenuItem.children)
  parent: MenuItem

  @Column({ type: 'datetime' })
  createdAt: string;
}
