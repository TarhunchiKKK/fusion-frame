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
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
let PathService = class PathService {
    constructor(pathRepository) {
        this.pathRepository = pathRepository;
        this.formats = [
            '.svg', '.png', '.jpg', '.jpeg', '.gif', '.raw', '.tlff', '.jfif', '.webp',
            '.mp4', '.avi', '.wmv'
        ];
        this.ExplorerHelper = {
            script: path.join(__dirname, '../../../helpers/explorer.py'),
            file: path.join(__dirname, '../../../helpers/explorer.txt')
        };
    }
    async findAll() {
        let count = await this.pathRepository.count();
        return await this.pathRepository.find({});
    }
    async addPath(createPathDto) {
        const directory = createPathDto.path;
        const exist = await this.pathRepository.findOne({
            where: {
                path: directory,
            },
        });
        if (exist != null) {
            throw new common_1.BadRequestException('This path is already added');
        }
        if (fs.existsSync(directory)) {
            const directoryStat = fs.statSync(directory);
            if (!directoryStat.isDirectory()) {
                throw new common_1.BadRequestException('This path is not a directory');
            }
            let new_path = new path_entity_1.Path();
            new_path.path = directory;
            return await this.pathRepository.save(new_path);
        }
        else {
            throw new common_1.BadRequestException('Path is not exist');
        }
    }
    async removePath(id) {
        await this.pathRepository.delete(id);
    }
    async checkForNewFiles(latestDate) {
        let directories = (await this.pathRepository.find()).map(p => p.path);
        let newFiles = [];
        for (let directory of directories) {
            let files = fs.readdirSync(directory);
            for (let file of files) {
                let fullpath = path.join(directory, file);
                let stat = fs.statSync(fullpath);
                let creationDate = stat.birthtime;
                let extension = path.extname(fullpath);
                if (creationDate > latestDate && this.formats.includes(extension)) {
                    newFiles.push(fullpath);
                }
            }
        }
        return newFiles;
    }
    openExplorer() {
        try {
            const result = child_process.execSync(`python ${this.ExplorerHelper.script}`, {
                encoding: 'utf-8',
            });
            let newDirectory = fs.readFileSync(this.ExplorerHelper.file, 'utf-8');
            return newDirectory;
        }
        catch (err) {
            console.log(err);
        }
        return '';
    }
    async openDirectoryInExplorer(directory) {
        try {
            directory = directory.replaceAll('/', '\\');
            const result = await child_process.exec(`python ${this.ExplorerHelper.script} ${directory}`, {
                encoding: 'utf-8',
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    async clear() {
        this.pathRepository.clear();
    }
};
exports.PathService = PathService;
exports.PathService = PathService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(path_entity_1.Path)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PathService);
//# sourceMappingURL=path.service.js.map