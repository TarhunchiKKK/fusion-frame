import { Album } from 'src/albums/entities/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn, JoinTable } from 'typeorm';
// import { Keywords } from './keywords.entity';

@Entity()
export class Media{
    @PrimaryGeneratedColumn({ name: 'media_id' })
    id: number;

    @Column()
    path: string;

    @Column()
    name: string;

    @Column()
    size: number;

    @Column()
    creationDate: Date;

    // ТРАБЛ
    // Postgres не поддерживает массив строк
    // так работает, но не понятно, что выйдет при считывании 
    @Column({ type: 'text', array: true })
    keywords: string[];

    @Column({ nullable: true })
    duration: number | undefined;

    
    // @ManyToMany(() => Album, (album) => album.media, { onDelete: 'NO ACTION' })
    @ManyToMany(() => Album)
    albums: Album[];
}


