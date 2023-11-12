import { AlbumService } from "./album.service";
import { Album } from "./entities/album.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { AddOneMediaDto } from "./dto/add-one-media.dto";
import { AddManyMediaDto } from "./dto/add-many-media.dto";
import { RemoveMediaFromAlbumDto } from "./dto/remove-media-from-album.dto";
import { AlbumNamesDto } from "./dto/album-names.dto";
import { AlbumIdsDto } from "./dto/album-ids.dto";
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    getAll(): Promise<Album[]>;
    getOne(id: number): Promise<Album>;
    getCount(): Promise<number>;
    getAlbumIds(): Promise<AlbumIdsDto>;
    getAlbumNames(): Promise<AlbumNamesDto>;
    getByName(albumName: string): Promise<Album[]>;
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    updateAlbumName(updateAlbumDto: UpdateAlbumDto): void;
    remove(id: number): void;
    addOneMediaToAlbum(addMediaDto: AddOneMediaDto): void;
    addManyMediaToAlbum(addMediaDto: AddManyMediaDto): void;
    removeMediaFromAlbum(removeMediaFromAlbumDto: RemoveMediaFromAlbumDto): void;
    clear(): Promise<void>;
}
