import { Album } from "./album.interface";

export interface Media{
    path: string;
    creationDate: Date;
    keywords: string[];
    duration: number | undefined;
    size: number;
    albums: Album[];
}