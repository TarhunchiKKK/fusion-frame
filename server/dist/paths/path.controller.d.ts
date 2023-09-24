import { Path } from "./entities/path.entity";
import { PathService } from "./path.service";
import { CreatePathDto } from "./dto/create-path.dto";
export declare class PathController {
    private readonly pathService;
    constructor(pathService: PathService);
    findAll(): Promise<Path[]>;
    create(CreatePathDto: CreatePathDto): Promise<Path>;
    remove(id: number): Promise<void>;
}
