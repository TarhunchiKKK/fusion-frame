import { BadRequestException, Injectable } from "@nestjs/common";
import { Media } from "./entities/media.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

const fs = require('fs');
const path = require('path');

function keywordsIntersection(a: string[], b: string[]): boolean{
    for(let word1 of a){
        for(let word2 of b){
            if(word1 == word2){
                return true;
            }
        }
    }
    return false;
}

@Injectable()
export class MediaService{

    private ImageStore: string = path.join(__dirname, '../../../client/public/storage/')
    // private ImageStore: string = path.join(__dirname, '../../../storage/')

    // форматы фото и видео файлов
    private formats: string[] = [
        '.svg', '.png', '.jpg', '.jpeg', '.gif', '.raw', '.tlff', '.jfif', '.webp',
        '.mp4', '.avi', '.wmv'   
    ];

    constructor(
        @InjectRepository(Media) private mediaRepository: Repository<Media>
    ) {}
    
    public async getAll(): Promise<Media[]> {
        let count: number = await this.mediaRepository.count();
        if(count == 0){
            throw new BadRequestException('No photos and videos');
        }
        let media: Media[] = await this.mediaRepository.find({
            relations:{
                albums: false,
            }
        });
        return media.sort((a, b) => a.creationDate < b.creationDate ? 1 : -1);
    }

    public async getOne(id: number): Promise<Media> {
        return await this.mediaRepository.findOne({
            where:{
                id: id,
            },
            relations:{
                albums: true,
            }
        });
    }

    public async updateKeywords(id: number, keywords: string[]){
        let media: Media = await this.mediaRepository.findOne({
            where:{
                id: id,
            }
        });

        media.keywords = keywords;
        await this.mediaRepository.update(id, media);
    }

    public async getLatestDate(): Promise<Date> {
        let media: Media[] = await this.mediaRepository.find();
        if(media.length == 0) return new Date(1990, 1, 1, 0, 0, 0, 0);
        else{
            let latestDate: Date = media[0].creationDate;
            for(let i = 1; i < media.length; i++){
                if(media[i].creationDate > latestDate) latestDate = media[i].creationDate;
            }
            return latestDate;
        }
    }

    public async findByKeywords(keywords: string[]): Promise<Media[]> {
        let count: number = await this.mediaRepository.count();
        if(count == 0){
            throw new BadRequestException('No photos and videos');
        }
        return (await this.mediaRepository.find())
                        .filter(a => keywordsIntersection(a.keywords, keywords))
                        .sort((a, b) => a.creationDate < b.creationDate ? 1 : -1);
    }

    // подразумевается, что путь уже проверен на существование и то, что он является каталогом
    public async loadMediaFromDirectory(directory: string){

        // получить файлы, которые являются фото или видео
        let files: string[] = fs.readdirSync(directory).filter(file =>{
            return this.formats.includes(path.extname(path.join(directory, file)));
        });

        // получить полные пути к файлам
        files = files.map(file => path.join(directory, file));

        // получить список готовых к сохранению объектов
        let media: Media[] = files.map(file =>{
            let m: Media = new Media();
            let stat = fs.statSync(file);
            m.path = file

            let lastSlashIndex: number = m.path.lastIndexOf('\\');
            m.name = m.path.substring(lastSlashIndex + 1)
            
            fs.copyFile(m.path, this.ImageStore + m.name, (err) => {
                if(err) console.error(err)
            })

            m.size = stat.size;
            m.creationDate = stat.birthtime;
            m.duration = undefined;
            m.keywords = [];
            return m;
        });

        await this.mediaRepository.save(media);
    }

    public async removeDirectoryMedia(directory: string){
        // получить файлы, которые являются фото или видео
        let files: string[] = fs.readdirSync(directory).filter(file =>{
            return this.formats.includes(path.extname(path.join(directory, file)));
        });

        // получить полные пути к файлам
        files = files.map(file => path.join(directory, file));

        let media: Media[] = await this.mediaRepository.find()
        let mediaToRemove: Media[] = []
        for(let m of media){
            if(files.includes(m.path)){
                mediaToRemove.push(m)

                fs.rm(this.ImageStore + m.name, (err) => {
                    if(err) console.log(err)
                })
            }
        }
        await this.mediaRepository.remove(mediaToRemove)
    }

    // подразумевается, что пути уже проверены на существование
    public async updateMediaFromDirectories(files: string[]){
        let media: Media[] = [];
        for(let file of files){
            let m: Media = new Media();
            let stat = fs.statSync(file);

            m.path = file

            let lastSlashIndex: number = m.path.lastIndexOf('\\');
            m.name = m.path.substring(lastSlashIndex + 1)
            fs.copyFile(m.path, this.ImageStore + m.name, (err) => {
                if (err) console.error(err)
            })

            m.size = stat.size;
            m.creationDate = stat.birthtime;
            m.duration = undefined;
            m.keywords = [];

            media.push(m);
        }
        await this.mediaRepository.save(media);
    }

    public async removeOne(id: number){
        let media: Media = await this.mediaRepository.findOne({
            where:{
                id: id,
            }
        })

        fs.rm(media.path, (err) => {
            if (err) console.error(err)
        })
        fs.rm(this.ImageStore + media.name, (err) => {
            if (err) console.error(err)
        })

        await this.mediaRepository.delete(id);
    }

    public async removeMany(ids: number[]){
        let media: Media[] = (await this.mediaRepository.find()).filter(m => ids.includes(m.id));

        for(let m of media){
            fs.rm(m.path, (err) => {
                if (err) console.error(err)
            })
            fs.rm(this.ImageStore + m.name, (err) => {
                if (err) console.error(err)
            })
        }

        await this.mediaRepository.remove(media);
    }
}

