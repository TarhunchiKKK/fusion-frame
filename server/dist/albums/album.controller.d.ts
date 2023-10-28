import { AlbumService } from "./album.service";
import { Album } from "./entities/album.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { SearchAlbumDto } from "./dto/search-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { AddOneMediaDto } from "./dto/add-one-media.dto";
import { AddManyMediaDto } from "./dto/add-many-media.dto";
import { RemoveMediaFromAlbumDto } from "./dto/remove-media-from-album.dto";
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    getAll(): Promise<Album[]>;
    getOne(id: number): Promise<Album>;
    getByName(searchAlbumDto: SearchAlbumDto): Promise<Album[]>;
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    updateAlbumName(updateAlbumDto: UpdateAlbumDto): void;
    remove(id: number): void;
    addOneMediaToAlbum(addMediaDto: AddOneMediaDto): void;
    addManyMediaToAlbum(addMediaDto: AddManyMediaDto): void;
    removeMediaFromAlbum(removeMediaFromAlbumDto: RemoveMediaFromAlbumDto): void;
    clear(): Promise<void>;
}
