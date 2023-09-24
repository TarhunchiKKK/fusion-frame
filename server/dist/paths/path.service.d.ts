import { CreatePathDto } from "./dto/create-path.dto";
import { Repository } from "typeorm";
import { Path } from "./entities/path.entity";
export declare class PathService {
    private readonly pathRepository;
    constructor(pathRepository: Repository<Path>);
    findAll(): Promise<Path[]>;
    create(createPathDto: CreatePathDto): Promise<Path>;
    remove(id: number): Promise<void>;
}
