import { Media } from "src/media/entities/media.entity";

export class CreateAlbumDto{
    name: string;
    media: Media[];
}