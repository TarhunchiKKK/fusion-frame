import { CreatePathDto } from "./dto/create-path.dto";
import { Repository } from "typeorm";
import { Path } from "./entities/path.entity";
export declare class PathService {
    private readonly pathRepository;
    private formats;
    private ExplorerHelper;
    constructor(pathRepository: Repository<Path>);
    findAll(): Promise<Path[]>;
    addPath(createPathDto: CreatePathDto): Promise<Path>;
    removePath(id: number): Promise<void>;
    checkForNewFiles(latestDate: Date): Promise<string[]>;
    openExplorer(): string;
    openDirectoryInExplorer(directory: string): Promise<void>;
    clear(): Promise<void>;
    copy(): Promise<void>;
}
