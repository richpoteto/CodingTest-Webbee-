import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Event} from './event.entity';

@Entity()
export class Workshop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    start: string;

    @Column({ type: 'datetime' })
    end: string;

    @Column({ type: 'integer', default: null })
    eventId: number;

    @Column()
    name: string;

    @ManyToOne(() => Event, (Event) => Event.workshops)
    event: Event

    @Column({ type: 'datetime' })
    createdAt: string;
}
