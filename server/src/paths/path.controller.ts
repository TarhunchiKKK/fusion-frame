import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Path } from "./entities/path.entity";
import { PathService } from "./path.service";
import { CreatePathDto } from "./dto/create-path.dto";
import { DirectoryDto } from "./dto/directory.dto";

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
    public addPath(@Body() CreatePathDto: CreatePathDto){
        return this.pathService.addPath(CreatePathDto);
    }

    // удалить 1 путь
    @Delete('delete/:id')
    public removePath(@Param('id') id: number){
        return this.pathService.removePath(id);
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
    public checkForNewFiles(@Body() latestDate: Date): Promise<string[]> {
        return this.pathService.checkForNewFiles(latestDate);
    }
}