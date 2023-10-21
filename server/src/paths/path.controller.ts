import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Path } from "./entities/path.entity";
import { PathService } from "./path.service";
import { CreatePathDto } from "./dto/create-path.dto";
import { DirectoryDto } from "./dto/directory.dto";
import { DateDto } from "./dto/date.dto";

@Controller('paths')
export class PathController{
    constructor(private readonly pathService: PathService) {}

    // получить все пути
    @Get('get')
    public getAll(): Promise<Path[]>{
        return this.pathService.findAll();
    }

    // добавить еще 1 путь
    @Post('add')
    public addPath(@Body() createPathDto: CreatePathDto): Promise<Path> {
        return this.pathService.addPath(createPathDto);
    }

    // удалить 1 путь
    @Delete('delete/:id')
    public removePath(@Param('id') id: number){
        this.pathService.removePath(id);
    }

    // открыть проводник
    @Post('explorer')
    public openExplorer(): void{
        this.pathService.openExplorer();
    }

    // открыть папку в проводнике
    @Post('openinexplorer')
    public openDirectoryInExplorer(@Body() directoryDto: DirectoryDto){
        this.pathService.openDirectoryInExplorer(directoryDto.path);
    }

    // проверить хранимые каталоги на новые файлы
    @Get('check')
    public checkForNewFiles(@Body() dateDto: DateDto): Promise<string[]> {
        let latestDate: Date = new Date(dateDto.creationDate);
        return this.pathService.checkForNewFiles(latestDate);
    }





    // POSTMAN
    @Post('clear')
    public async clear(){
        this.pathService.clear();
    }

    @Post('copy')
    public async copy(){
        this.pathService.copy();
    }
}