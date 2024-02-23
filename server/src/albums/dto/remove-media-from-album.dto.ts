import { Media } from "src/media/entities/media.entity"

export class RemoveMediaFromAlbumDto{
    albumId: number
    media: Media
}