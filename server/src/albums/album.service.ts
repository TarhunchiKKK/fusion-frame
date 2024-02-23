import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "./entities/album.entity";
import { Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Media } from "src/media/entities/media.entity";
import { AlbumNamesDto } from "./dto/album-names.dto";
import { AlbumIdsDto } from "./dto/album-ids.dto";

@Injectable()
export class AlbumService{

    constructor(@InjectRepository(Album) private readonly albumRepository: Repository<Album>) {}
    
    // получить все альбомы
    public async getAll(): Promise<Album[]>{
        let count: number = await this.albumRepository.count();
        if(count == 0){
            throw new BadRequestException('No albums');
        }
        let albums: Album[] = await this.albumRepository.find({
            relations:{
                media: false,               
            }
        });
        return albums.sort((a, b) => a.name > b.name? 1: -1);
    }

    // получить конкретный альбом
    public async getOne(id: number): Promise<Album> {
        return await this.albumRepository.findOne({
            where:{
                id: id,
            },
            relations: {
                media: true,
            }
        });
    }

    public async getCount(): Promise<number>{
        return this.albumRepository.count()
    }

    public async getAlbumIds(): Promise<AlbumIdsDto>{
        let albumIds: number[] = (await this.albumRepository.find()).map(album => album.id)
        return { albumIds: albumIds }
    }

    public async getAlbumNames(): Promise<AlbumNamesDto>{
        let albumNames: string[] = (await this.albumRepository.find()).map(album => album.name)
        return { albumNames: albumNames }
    }


    // поиск альбомов по названию
    public async findByName(name: string): Promise<Album[]> {
        let count: number = await this.albumRepository.count();
        if(count == 0){
            throw new BadRequestException('No albums');
        }

        let albums: Album[] = await this.albumRepository.find({
            relations: {
                media: false,
            }
        });
        return albums.filter(album => album.name.includes(name)).sort((a, b) => a.name < b.name? 1: -1);
    }

    // добавление нового альбома
    public async create(createAlbumDto: CreateAlbumDto): Promise<Album>{
        const exist = this.albumRepository.findOne({
            where:{
                name: createAlbumDto.name,
            },
        });

        if(exist == null){
            throw new BadRequestException('Album with such name already exists');
        }

        let album: Album = new Album();
        album.name = createAlbumDto.name;
        return await this.albumRepository.save(album);
    }

    public async updateAlbumName(id: number, name: string){
        let album: Album = await this.albumRepository.findOne({
            where:{
                id: id,
            }
        });

        album.name = name;
        await this.albumRepository.update(id, album);
    }

    public async remove(id: number) {
        await this.albumRepository.delete(id);
    }

    public async addOneMediaToAlbum(id: number, media: Media){
        let album: Album = await this.albumRepository.findOne({
            where:{
                id: id,
            },
            relations:{
                media: true,
            }
        });

        // если это фото не содержится в альбоме - добавить его
        if(!album.media.map(m => m.id).includes(media.id)){
            album.media.push(media);
        }

        await this.albumRepository.save(album);
    }

    public async addManyMediaToAlbum(id: number, media: Media[]){
        let album: Album = await this.albumRepository.findOne({
            where:{
                id: id,
            },
            relations: {
                media: true,
            }
        });

        // проход по массиву медиафайлов
        for(let i = 0; i < media.length; i++){
            // если это фото не содержится в альбоме - добавить его
            if(!album.media.map(m => m.id).includes(media[i].id)){
                album.media.push(media[i]);
            }
        }

        await this.albumRepository.save(album);
    }


    public async removeMediaFromAlbum(albumId: number, media: Media){
        let album: Album = await this.albumRepository.findOne({
            where:{
                id: albumId,
            },
            relations:{
                media: true,
            }
        });
        if(album === undefined){
            return;
        }
        
        album.media = album.media.filter(m => m.id != media.id)
        await this.albumRepository.save(album)
    }
}