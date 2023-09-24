import { AlbumService } from "./album.service";
import { Album } from "./entities/album.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album>;
    findMany(name: string): Promise<Album[]>;
    create(createAlbumDto: CreateAlbumDto): Promise<Album>;
    remove(id: number): Promise<void>;
}
