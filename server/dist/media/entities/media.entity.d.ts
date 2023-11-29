import { Album } from '../../albums/entities/album.entity';
export declare class Media {
    id: number;
    path: string;
    name: string;
    size: number;
    creationDate: Date;
    keywords: string[];
    duration: number | undefined;
    albums: Album[];
}
