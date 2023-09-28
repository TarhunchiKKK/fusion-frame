import { Path } from "./entities/path.entity";
import { PathService } from "./path.service";
import { CreatePathDto } from "./dto/create-path.dto";
import { DirectoryDto } from "./dto/directory.dto";
export declare class PathController {
    private readonly pathService;
    constructor(pathService: PathService);
    getAll(): Promise<Path[]>;
    addPath(CreatePathDto: CreatePathDto): Promise<Path>;
    removePath(id: number): Promise<void>;
    openExplorer(): void;
    openDirectoryInExplorer(directoryDto: DirectoryDto): void;
    checkForNewFiles(latestDate: Date): Promise<string[]>;
}
