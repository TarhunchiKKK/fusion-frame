import { MediaService } from "./media.service";
import { KeywordsDto } from "./dto/keywords.dto";
import { Media } from "./entities/media.entity";
import { LoadMediaDto } from "./dto/load-media.dto.ts";
import { RemoveMediasDto } from "./dto/remove-medias.dto";
import { UploadMediaDto } from "./dto/upload-media.dto";
import { UpdateKeywordsDto } from "./dto/update-keywords.dto";
import { CreateMediaDto } from "./dto/create-media.dto";
export declare class MediaController {
    private mediaService;
    constructor(mediaService: MediaService);
    getAll(): Promise<Media[]>;
    getOne(id: number): Promise<Media>;
    findByKeywords(keywords: KeywordsDto): Promise<Media[]>;
    updateKeywords(updateKeywordsDto: UpdateKeywordsDto): Promise<void>;
    getLatestDate(): Promise<Date>;
    loadMediaFromDirectory(directory: LoadMediaDto): void;
    updateMediaFromDirectories(uploadMediaDto: UploadMediaDto): void;
    remoeOne(id: number): void;
    removeMany(removeMediaDto: RemoveMediasDto): void;
    create(createMediaDto: CreateMediaDto): Promise<void>;
}
