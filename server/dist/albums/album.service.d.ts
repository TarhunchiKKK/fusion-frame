import { Album } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Media } from "src/media/entities/media.entity";
export declare class AlbumService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<Album>);
    getAll(): Promise<Album[]>;
    getOne(id: number): Promise<Album>;
    findByName(name: string): Promise<Album[]>;
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    updateAlbumName(id: number, name: string): Promise<void>;
    remove(id: number): Promise<void>;
    addOneMediaToAlbum(id: number, media: Media): Promise<void>;
    addManyMediaToAlbum(id: number, media: Media[]): Promise<void>;
    clear(): Promise<void>;
}
