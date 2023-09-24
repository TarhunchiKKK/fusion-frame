import { Media } from "src/media/entities/media.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album{
    @PrimaryGeneratedColumn({ name: 'album_id' })
    id: number;

    @Column()
    name: string;

    @Column()
    mediaCount: number;

    @Column()
    size: number;

    @ManyToMany(() => Media, (media) => media.albums, { onDelete: 'NO ACTION' })
    media: Media[];
}
