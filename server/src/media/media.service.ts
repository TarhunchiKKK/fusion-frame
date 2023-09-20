import { Injectable } from "@nestjs/common";
import { Media } from "./interfaces/media.interface";
import { KeywordsDto } from "./dto/keywords.dto";

@Injectable()
export class MediaService{
    private paths: string[] = [];
    private readonly media: Media[] = [];

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