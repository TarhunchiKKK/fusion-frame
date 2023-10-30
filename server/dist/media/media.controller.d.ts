import { MediaService } from "./media.service";
import { Media } from "./entities/media.entity";
import { RemoveMediasDto } from "./dto/remove-medias.dto";
import { UploadMediaDto } from "./dto/upload-media.dto";
import { UpdateKeywordsDto } from "./dto/update-keywords.dto";
import { CreateMediaDto } from "./dto/create-media.dto";
import { DirectoryDto } from "src/paths/dto/directory.dto";
export declare class MediaController {
    private mediaService;
    constructor(mediaService: MediaService);
    getAll(): Promise<Media[]>;
    getOne(id: number): Promise<Media>;
    findByKeywords(keywords: string[]): Promise<Media[]>;
    updateKeywords(updateKeywordsDto: UpdateKeywordsDto): Promise<void>;
    getLatestDate(): Promise<Date>;
    loadMediaFromDirectory(directory: DirectoryDto): void;
    removeMediaFromDirectory(directory: DirectoryDto): void;
    updateMediaFromDirectories(uploadMediaDto: UploadMediaDto): void;
    removeOne(id: number): void;
    removeMany(removeMediaDto: RemoveMediasDto): void;
    create(createMediaDto: CreateMediaDto): Promise<void>;
    clear(): Promise<void>;
}
