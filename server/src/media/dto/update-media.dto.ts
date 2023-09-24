import { Album } from "src/albums/entities/album.entity";

export class UpdateMediaDto{
    keywords: string[];
    albums: Album[];
}