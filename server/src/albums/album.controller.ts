import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { Album } from "./entities/album.entity";
import { CreateAlbumDto } from "./dto/create-album.dto";

@Controller('albums')
export class AlbumController{
    constructor(private readonly albumService: AlbumService) {}

    @Get()
    public findAll(): Promise<Album[]>{
        return this.albumService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id') id: number): Promise<Album>{
        return this.albumService.findOne(id);
    }

    @Get(':name')
    public findMany(@Param('name') name: string): Promise<Album[]>{
        return this.albumService.findMany(name);
    }

    @Post()
    public create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album>{
        return this.albumService.create(createAlbumDto);
    }

    @Delete(':id')
    public remove(@Param('id')id: number){
        return this.albumService.remove(id);
    }
}