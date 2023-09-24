import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Path } from "./entities/path.entity";
import { PathService } from "./path.service";
import { CreatePathDto } from "./dto/create-path.dto";

@Controller('paths')
export class PathController{
    constructor(private readonly pathService: PathService) {}

    @Get()
    public findAll(): Promise<Path[]>{
        return this.pathService.findAll();
    }

    @Post()
    public create(@Body() CreatePathDto: CreatePathDto){
        return this.pathService.create(CreatePathDto);
    }

    @Delete(':id')
    public remove(@Param('id') id: number){
        return this.pathService.remove(id);
    }
}