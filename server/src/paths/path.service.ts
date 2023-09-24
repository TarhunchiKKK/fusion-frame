import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePathDto } from "./dto/create-path.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Path } from "./entities/path.entity";

@Injectable()
export class PathService{

    constructor(@InjectRepository(Path) private readonly pathRepository: Repository<Path>) {}

    public async findAll(): Promise<Path[]>{
        let count: number = await this.pathRepository.count();
        if(count ==  0) {
            throw new BadRequestException('Np paths');
        }
        return await this.pathRepository.find({});
    } 

    public async create(createPathDto: CreatePathDto): Promise<Path>{
        const exist = await this.pathRepository.findOne({
            where:{
                path: createPathDto.path,
            },
        });
        if(exist){
            throw new BadRequestException('This path is already exists');
        }

        let path: Path = new Path();
        path.path = createPathDto.path;
        return await this.pathRepository.save(path);
    }

    public async remove(id: number){
        await this.pathRepository.delete(id);
    }
}