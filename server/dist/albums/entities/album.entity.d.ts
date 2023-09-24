import { Media } from "src/media/entities/media.entity";
export declare class Album {
    id: number;
    name: string;
    mediaCount: number;
    size: number;
    media: Media[];
}
