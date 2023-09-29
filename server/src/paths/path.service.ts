import { BadRequestException, Inject, Injectable, forwardRef } from "@nestjs/common";
import { CreatePathDto } from "./dto/create-path.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Path } from "./entities/path.entity";

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

function replaceSymbol(str: string, old_symbol: string, new_symbol: string) {
    let new_str: string = "";
    for(let c of str){
        if(c == old_symbol) new_str += new_symbol;
        else new_str += c;
    }
    return new_str;
}

@Injectable()
export class PathService{

    private formats: string[] = [
        '.svg', '.png', '.jpg', '.jpeg', '.gif', '.raw', '.tlff', '.jfif',
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
        if(exist != null){
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
        // путь приходит из базы, поэтому его не надо проверять на существование
        try{
            directory = replaceSymbol(directory, '/', '\\');
            const result = child_process.execSync(`explorer \"${directory}\"`, {
                encoding: 'utf-8',
            });   
        } catch(err){
            console.log(err);
        }
    }

    public async checkForNewFiles(latestDate: Date): Promise<string[]> {
        let directories: string[] = (await this.pathRepository.find()).map(p => p.path);
        let newFiles: string[] = [];
        for(let directory of directories){
            let files = fs.readdirSync(directory);
            for(let file of files){
                let fullpath: string = path.join(directory, file);
                let stat = fs.statSync(fullpath);
                let creationDate: Date = stat.birthtime;
                let extension: string = path.extname(fullpath);
                if(creationDate > latestDate && this.formats.includes(extension)){
                    newFiles.push(fullpath);
                }
            }
        }
        return newFiles;
    }



    // POSTMAN
    public async clear(){
        this.pathRepository.clear();
    }

}