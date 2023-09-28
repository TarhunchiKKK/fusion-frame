import { CreatePathDto } from "./dto/create-path.dto";
import { Repository } from "typeorm";
import { Path } from "./entities/path.entity";
export declare class PathService {
    private readonly pathRepository;
    private formats;
    constructor(pathRepository: Repository<Path>);
    findAll(): Promise<Path[]>;
    addPath(createPathDto: CreatePathDto): Promise<Path>;
    removePath(id: number): Promise<void>;
    openExplorer(): void;
    openDirectoryInExplorer(directory: string): void;
    checkForNewFiles(latestDate: Date): Promise<string[]>;
}
