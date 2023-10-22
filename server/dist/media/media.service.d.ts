import { Media } from "./entities/media.entity";
import { Repository } from 'typeorm';
import { CreateMediaDto } from "./dto/create-media.dto";
export declare class MediaService {
    private mediaRepository;
    private ImageStore;
    private formats;
    constructor(mediaRepository: Repository<Media>);
    getAll(): Promise<Media[]>;
    getOne(id: number): Promise<Media>;
    updateKeywords(id: number, keywords: string[]): Promise<void>;
    getLatestDate(): Promise<Date>;
    findByKeywords(keywords: string[]): Promise<Media[]>;
    loadMediaFromDirectory(directory: string): Promise<void>;
    updateMediaFromDirectories(files: string[]): Promise<void>;
    removeOne(id: number): Promise<void>;
    removeMany(ids: number[]): Promise<void>;
    create(createMediaDto: CreateMediaDto): Promise<void>;
    clear(): Promise<void>;
}
