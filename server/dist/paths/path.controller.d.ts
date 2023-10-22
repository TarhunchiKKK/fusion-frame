import { Path } from "./entities/path.entity";
import { PathService } from "./path.service";
import { CreatePathDto } from "./dto/create-path.dto";
import { DirectoryDto } from "./dto/directory.dto";
import { DateDto } from "./dto/date.dto";
export declare class PathController {
    private readonly pathService;
    constructor(pathService: PathService);
    getAll(): Promise<Path[]>;
    addPath(createPathDto: CreatePathDto): Promise<Path>;
    removePath(id: number): void;
    openExplorer(): string;
    openDirectoryInExplorer(directoryDto: DirectoryDto): void;
    checkForNewFiles(dateDto: DateDto): Promise<string[]>;
    clear(): Promise<void>;
    copy(): Promise<void>;
}
