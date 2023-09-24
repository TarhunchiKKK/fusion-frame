import { Injectable } from "@nestjs/common";
import { Media } from "./entities/media.entity";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { KeywordsDto } from "./dto/keywords.dto";

@Injectable()
export class MediaService{
    private paths: string[] = [];
    private readonly media: Media[] = [];

    constructor(@InjectRepository(Media) private mediaRepository: Repository<Media>) {}
    
}

