import { Injectable } from "@nestjs/common";
import { KeywordsDto } from "./dto/keywords.dto";
import { Media } from "./entities/media.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MediaService{
    private paths: string[] = [];
    private readonly media: Media[] = [];

    constructor(@InjectRepository(Media) private mediaRepository: Repository<Media>) {}

    public addPath(path: string): void{

    }

    public findAll(): Media[]{
        
        return [];
    }

    public findById(id: number): Media{

        return this.media[0];
    }

    public findByKeywords(keywords: KeywordsDto): Media[]{

        return [];
    }

    public updateKeywords(id: number, keywords: KeywordsDto): void{

    }   

    public remove(id: number): void{

    }
}

