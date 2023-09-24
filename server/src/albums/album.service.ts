import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";

@Injectable()
export class AlbumService{

    constructor(@InjectRepository(Album) private readonly albumRepository: Repository<Album>) {}
    
    // получить все альбомы
    public async findAll(): Promise<Album[]>{
        let count: number = await this.albumRepository.count();
        if(count == 0){
            throw new BadRequestException('No albums');
        }
        let albums: Album[] = await this.albumRepository.find();
        return albums.sort((a, b) => a.name < b.name? 1: -1);
    }

    // получить конкретный альбом
    public async findOne(id: number): Promise<Album> {
        return await this.albumRepository.findOne({
            where:{
                id: id,
            },
        });
    }

    // поиск альбомов по названию
    public async findMany(name: string): Promise<Album[]> {
        let count: number = await this.albumRepository.count();
        if(count == 0){
            throw new BadRequestException('No albums');
        }

        let albums: Album[] = await this.albumRepository.find();
        return albums.filter(album => album.name.includes(name)).sort((a, b) => a.name < b.name? 1: -1);
    }

    // добавление нового альбома
    public async create(createAlbumDto: CreateAlbumDto): Promise<Album>{
        const exist = this.albumRepository.findOne({
            where:{
                name: createAlbumDto.name,
            },
        });

        if(exist){
            throw new BadRequestException('Album with such name already exists');
        }

        let album: Album = new Album();
        album.name = createAlbumDto.name;
        album.media = createAlbumDto.media;
        return await this.albumRepository.save(album);
    }

    public async remove(id: number) {
        await this.albumRepository.delete(id);
    }
}