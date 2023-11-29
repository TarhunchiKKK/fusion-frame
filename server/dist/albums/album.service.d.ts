import { Album } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Media } from "src/media/entities/media.entity";
import { AlbumNamesDto } from "./dto/album-names.dto";
import { AlbumIdsDto } from "./dto/album-ids.dto";
export declare class AlbumService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<Album>);
    getAll(): Promise<Album[]>;
    getOne(id: number): Promise<Album>;
    getCount(): Promise<number>;
    getAlbumIds(): Promise<AlbumIdsDto>;
    getAlbumNames(): Promise<AlbumNamesDto>;
    findByName(name: string): Promise<Album[]>;
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    updateAlbumName(id: number, name: string): Promise<void>;
    remove(id: number): Promise<void>;
    addOneMediaToAlbum(id: number, media: Media): Promise<void>;
    addManyMediaToAlbum(id: number, media: Media[]): Promise<void>;
    removeMediaFromAlbum(albumId: number, media: Media): Promise<void>;
}
