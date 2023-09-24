"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const path_entity_1 = require("./entities/path.entity");
let PathService = class PathService {
    constructor(pathRepository) {
        this.pathRepository = pathRepository;
    }
    async findAll() {
        let count = await this.pathRepository.count();
        if (count == 0) {
            throw new common_1.BadRequestException('Np paths');
        }
        return await this.pathRepository.find({});
    }
    async create(createPathDto) {
        const exist = await this.pathRepository.findOne({
            where: {
                path: createPathDto.path,
            },
        });
        if (exist) {
            throw new common_1.BadRequestException('This path is already exists');
        }
        let path = new path_entity_1.Path();
        path.path = createPathDto.path;
        return await this.pathRepository.save(path);
    }
    async remove(id) {
        await this.pathRepository.delete(id);
    }
};
exports.PathService = PathService;
exports.PathService = PathService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(path_entity_1.Path)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PathService);
//# sourceMappingURL=path.service.js.map