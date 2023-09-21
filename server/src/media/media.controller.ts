import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MediaService } from "./media.service";
import { KeywordsDto } from "./dto/keywords.dto"
import { ParseKeywordsDtoPipe } from "src/middleware/parse-keywords-dto.pipe";
import { Media } from "./entities/media.entity";

@Controller('media')
export class MediaController{
    constructor(private mediaService: MediaService) {}

    @Get()
    public async findAll(): Promise<Media[]>{
        return this.mediaService.findAll();
    }

    @Get(':id')
    public findById(@Param('id', ParseIntPipe) id: number): Media{
        return this.mediaService.findById(id);
    }

    @Get(':keywords')
    public findByKeywords(@Param('keywords', ParseKeywordsDtoPipe) keywords: KeywordsDto): Media[]{
        return this.mediaService.findByKeywords(keywords);
    }

    @Put(':id')
    public updateKeywords(@Param('id', ParseIntPipe) id: number, @Param('keywords', ParseKeywordsDtoPipe) keywords: KeywordsDto): void{
        this.mediaService.updateKeywords(id, keywords);
    }

    @Delete(':id')
    public remove(@Param('id', ParseIntPipe) id: number): void{
        this.mediaService.remove(id);
    }

    @Post()
    public addPath(@Param('path') path: string): void{
        
    }
}