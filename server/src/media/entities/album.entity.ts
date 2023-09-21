import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Media } from './media.entity';

@Entity()
export class Album{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    size: number;

    @Column()
    count: number;

    @Column({ default: null })
    media: Media[] | null;
}

