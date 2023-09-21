import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Album } from './album.entity';

@Entity()
export class Media{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    path: string;

    @Column()
    size: number;

    @Column()
    creationDate: Date;

    @Column()
    keywords: string[];

    @Column()
    duration: number | undefined;

    //@Column({ default: null })
    @ManyToMany(type => Album, album => album.media)
    albums: Album[] | null;
}


