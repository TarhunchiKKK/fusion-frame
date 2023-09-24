import { Media } from "./entities/media.entity";
import { Repository } from 'typeorm';
export declare class MediaService {
    private mediaRepository;
    private paths;
    private readonly media;
    constructor(mediaRepository: Repository<Media>);
}
