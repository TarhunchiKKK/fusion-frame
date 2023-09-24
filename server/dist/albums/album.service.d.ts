import { Album } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
export declare class AlbumService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<Album>);
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album>;
    findMany(name: string): Promise<Album[]>;
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    remove(id: number): Promise<void>;
}
