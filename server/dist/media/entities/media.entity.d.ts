import { Album } from 'src/albums/entities/album.entity';
export declare class Media {
    id: number;
    path: string;
    size: number;
    creationDate: Date;
    keywords: String[];
    duration: number | undefined;
    albums: Album[];
}
