import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import {Workshop} from './workshop.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Workshop, (Workshop) => Workshop.event)
    workshops: Workshop[]

    @Column({ type: 'datetime' })
    createdAt: string;
}
