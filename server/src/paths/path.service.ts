import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { CreatePathDto } from "./dto/create-path.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Path } from "./entities/path.entity";

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

@Injectable()
export class PathService{

    private formats: string[] = [
        '.svg', '.png', '.jpg', '.jpeg', '.gif', '.raw', '.tlff',
        '.mp4', '.avi', '.wmv'   
    ];

    constructor(
        @InjectRepository(Path) private readonly pathRepository: Repository<Path>
    ) {}

    public async findAll(): Promise<Path[]>{
        let count: number = await this.pathRepository.count();
        if(count ==  0) {
            throw new BadRequestException('Np paths');
        }

        return await this.pathRepository.find({});
    } 

    public async addPath(createPathDto: CreatePathDto): Promise<Path>{
        const directory = createPathDto.path;
        const exist = await this.pathRepository.findOne({
            where:{
                path: directory,
            },
        });
        if(exist){
            throw new BadRequestException('This path is already added');
        }

        if(fs.existsSync(directory)){
            const directoryStat = fs.statSync(directory);
            if(!directoryStat.isDirectory()){
                throw new BadRequestException('This path is not a directory');
            }

            let new_path: Path = new Path();
            new_path.path = directory;
            return await this.pathRepository.save(new_path);
        }

        // А НУЖНО ЛИ ГЕНЕРИТЬ ЕКЗЕПШН
        else{
            throw new BadRequestException('Path is not exist');
        }
    }

    public async removePath(id: number){
        await this.pathRepository.delete(id);
    }

    public openExplorer(){
        try{
            const result = child_process.execSync('explorer ', {
                encoding: 'utf-8',
            });   
        } catch(err){
            console.log(err);
        }
    }

    public openDirectoryInExplorer(directory: string){
        // путь приходит из базы, поэтому его не надо проверять
        try{
            const result = child_process.execSync(`explorer \"${directory}\"`, {
                encoding: 'utf-8',
            });   
        } catch(err){
            console.log(err);
        }
    }

    public async checkForNewFiles(latestDate: Date): Promise<string[]> {
        let directories: string[] = (await this.pathRepository.find()).map(p => p.path);
        directories = directories.filter(directory => {
            let files: string[] = fs.readdirSync(directory);
            for(let file of files){
                let stat = fs.statSync(path.join(directory, file));
                if(stat.birthtime > latestDate) return true;
            }
            return false;
        });
        return directories;
    }

}