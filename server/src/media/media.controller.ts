import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MediaService } from "./media.service";
import { KeywordsDto } from "./dto/keywords.dto"
import { Media } from "./entities/media.entity";
import { LoadMediaDto } from "./dto/load-media.dto.ts";
import { RemoveMediasDto } from "./dto/remove-medias.dto";
import { UploadMediaDto } from "./dto/upload-media.dto";
import { UpdateKeywordsDto } from "./dto/update-keywords.dto";
import { CreateMediaDto } from "./dto/create-media.dto";

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
    public findByKeywords(@Body() keywords: KeywordsDto): Promise<Media[]>{
        return this.mediaService.findByKeywords(keywords.keywords);
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
    public loadMediaFromDirectory(@Body() directory: LoadMediaDto){
        this.mediaService.loadMediaFromDirectory(directory.path);
    }

    // добавить новые файлы из каталогов
    @Post('uploadmedia')
    public updateMediaFromDirectories(@Body() uploadMediaDto: UploadMediaDto){
        this.mediaService.updateMediaFromDirectories(uploadMediaDto.paths, uploadMediaDto.latestDate);
    }

    // удалить медиафайл
    @Delete('delete/:id')
    public remoeOne(@Param('id') id: number){
        this.mediaService.removeOne(id);
    }

    // удалить несколько медиафайлов
    @Delete('delete')
    public removeMany(@Body() removeMediaDto: RemoveMediasDto){
        this.mediaService.removeMany(removeMediaDto.ids);
    }





    // ДЛЯ ТЕСТОВ
    @Post('add')
    public async create(@Body() createMediaDto: CreateMediaDto){
        this.mediaService.create(createMediaDto);
    }
}