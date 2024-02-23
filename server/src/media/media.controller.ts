import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MediaService } from "./media.service";
import { Media } from "./entities/media.entity";
import { RemoveMediasDto } from "./dto/remove-medias.dto";
import { UploadMediaDto } from "./dto/upload-media.dto";
import { UpdateKeywordsDto } from "./dto/update-keywords.dto";
import { DirectoryDto } from "../paths/dto/directory.dto";

@Controller('media')
export class MediaController{

    constructor(private mediaService: MediaService) {}

    // получить все медиафайлы
    @Get('get')
    public getAll(): Promise<Media[]>{
        return this.mediaService.getAll();
    }

    // получить конкретный медиафайл
    @Get('get/:id')
    public getOne(@Param('id') id: number): Promise<Media>{
        return this.mediaService.getOne(id);
    }

    // получить медиафайлы по ключевым словам
    @Get('search')
    public findByKeywords(@Query('keywords') keywords: string[]): Promise<Media[]>{
        return this.mediaService.findByKeywords(keywords);
    }

    // обновить ключевые слова для медиафайла
    @Put('updatekeywords')
    public async updateKeywords(@Body() updateKeywordsDto: UpdateKeywordsDto){
        this.mediaService.updateKeywords(updateKeywordsDto.id, updateKeywordsDto.keywords);
    }

    // получить дату создания последнего хранимого медиафайла
    @Get('latestdate')
    public async getLatestDate(): Promise<Date> {
        return this.mediaService.getLatestDate();
    }

    // загрузить медиафайлы из каталога
    @Post('loadmedia')
    public loadMediaFromDirectory(@Body() directory: DirectoryDto){
        this.mediaService.loadMediaFromDirectory(directory.path);
    }

    @Delete('removedirectorymedia')
    public removeMediaFromDirectory(@Body() directory: DirectoryDto){
        this.mediaService.removeDirectoryMedia(directory.path)
    }

    // добавить новые файлы из каталогов
    @Post('uploadmedia')
    public updateMediaFromDirectories(@Body() uploadMediaDto: UploadMediaDto){
        this.mediaService.updateMediaFromDirectories(uploadMediaDto.paths);
    }

    // удалить медиафайл
    @Delete('delete/:id')
    public removeOne(@Param('id') id: number){
        this.mediaService.removeOne(id);
    }

    // удалить несколько медиафайлов
    @Delete('delete')
    public removeMany(@Body() removeMediaDto: RemoveMediasDto){
        this.mediaService.removeMany(removeMediaDto.ids);
    }
}




