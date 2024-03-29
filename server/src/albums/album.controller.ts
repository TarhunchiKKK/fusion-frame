import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import { AlbumService } from "./album.service";
import { Album } from "./entities/album.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { AddOneMediaDto } from "./dto/add-one-media.dto";
import { AddManyMediaDto } from "./dto/add-many-media.dto";
import { RemoveMediaFromAlbumDto } from "./dto/remove-media-from-album.dto";
import { AlbumNamesDto } from "./dto/album-names.dto";
import { AlbumIdsDto } from "./dto/album-ids.dto";

@Controller('albums')
export class AlbumController{
    constructor(private readonly albumService: AlbumService) {}

    // получить все альбомы (БЕЗ МЕДИАФАЙЛОВ)
    @Get('get')
    public getAll(): Promise<Album[]>{
        return this.albumService.getAll();
    }

    // получить конкретный альбом (ВМЕСТЕ С ЕГО МЕДИАФАЙЛАМИ)
    @Get('get/:id')
    public getOne(@Param('id') id: number): Promise<Album>{
        return this.albumService.getOne(id);
    }


    @Get('count')
    public getCount():Promise<number>{
        return this.albumService.getCount();
    }

    @Get('ids')
    public getAlbumIds(): Promise<AlbumIdsDto>{
        return this.albumService.getAlbumIds();
    }

    @Get('names')
    public getAlbumNames(): Promise<AlbumNamesDto>{
        return this.albumService.getAlbumNames();
    }


    // получить альбомы (БЕЗ ИХ МЕДИАФАЙЛОВ) по имени
    @Get('search')
    public getByName(@Query('albumName') albumName: string): Promise<Album[]>{
        return this.albumService.findByName(albumName);
    }

    // создать альбом
    @Post('create')
    public create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album>{
        return this.albumService.create(createAlbumDto);
    }

    // изменить имя альбома
    @Put('updatename')
    public updateAlbumName(@Body() updateAlbumDto: UpdateAlbumDto){
        this.albumService.updateAlbumName(updateAlbumDto.id, updateAlbumDto.name);
    }

    // удалить альбом (БЕЗ УДАЛЕНИЯ ЕГО МЕДИАФАЙЛОВ)
    @Delete('delete/:id')
    public remove(@Param('id')id: number){
        this.albumService.remove(id);
    }

    // добавить 1 медиафайл в альбом
    @Post('addonemedia')
    public addOneMediaToAlbum(@Body() addMediaDto: AddOneMediaDto){
        this.albumService.addOneMediaToAlbum(addMediaDto.id, addMediaDto.media);
    }

    // добавить несколько медиафайлов в альбом
    @Post('addmanymedia')
    public addManyMediaToAlbum(@Body() addMediaDto: AddManyMediaDto){
        this.albumService.addManyMediaToAlbum(addMediaDto.id, addMediaDto.media);
    }


    @Delete('removemedia')
    public removeMediaFromAlbum(@Body() removeMediaFromAlbumDto: RemoveMediaFromAlbumDto){
        this.albumService.removeMediaFromAlbum(removeMediaFromAlbumDto.albumId, removeMediaFromAlbumDto.media);
    }
}