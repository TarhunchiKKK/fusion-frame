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
exports.MediaService = void 0;
const common_1 = require("@nestjs/common");
const media_entity_1 = require("./entities/media.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const fs = require('fs');
const path = require('path');
function keywordsIntersection(a, b) {
    for (let word1 of a) {
        for (let word2 of b) {
            if (word1 == word2) {
                return true;
            }
        }
    }
    return false;
}
let MediaService = class MediaService {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
        this.formats = [
            '.svg', '.png', '.jpg', '.jpeg', '.gif', '.raw', '.tlff',
            '.mp4', '.avi', '.wmv'
        ];
    }
    async getAll() {
        let count = await this.mediaRepository.count();
        if (count == 0) {
            throw new common_1.BadRequestException('No photos and videos');
        }
        let media = await this.mediaRepository.find();
        return media.sort((a, b) => a.creationDate < b.creationDate ? -1 : 1);
    }
    async getOne(id) {
        return await this.mediaRepository.findOne({
            where: {
                id: id,
            },
        });
    }
    async updateKeywords(id, keywords) {
        let media = await this.mediaRepository.findOne({
            where: {
                id: id,
            }
        });
        media.keywords = keywords;
        await this.mediaRepository.update(id, media);
    }
    async getLatestDate() {
        let media = await this.mediaRepository.find();
        if (media.length == 0)
            return new Date(1990, 1, 1, 0, 0, 0, 0);
        else {
            let latestDate = media[0].creationDate;
            for (let i = 1; i < media.length; i++) {
                if (media[i].creationDate > latestDate)
                    latestDate = media[i].creationDate;
            }
            return latestDate;
        }
    }
    async findByKeywords(keywords) {
        let count = await this.mediaRepository.count();
        if (count == 0) {
            throw new common_1.BadRequestException('No photos and videos');
        }
        return (await this.mediaRepository.find()).filter(a => keywordsIntersection(a.keywords, keywords));
    }
    async loadMediaFromDirectory(directory) {
        let files = fs.readdirSync(directory).filter(file => {
            return this.formats.includes(path.extname(path.join(directory, file)));
        });
        files = files.map(file => path.join(directory, file));
        let media = files.map(file => {
            let m = new media_entity_1.Media();
            let stat = fs.statSync(file);
            m.path = file;
            m.size = stat.size;
            m.creationDate = stat.birthtime;
            m.duration = undefined;
            m.keywords = [];
            return m;
        });
        await this.mediaRepository.save(media);
    }
    async updateMediaFromDirectories(directories, latestDate) {
        let files = [];
        for (let directory of directories) {
            let filenames = fs.readdirSync(directory).filter(file => {
                return this.formats.includes(path.extname(path.join(directory, file)));
            });
            let paths = filenames.map(file => path.join(directory, file));
            let newFiles = paths.filter(file => {
                let stat = fs.statSync(file);
                if (stat.birthtime > latestDate)
                    return true;
                else
                    return false;
            });
            files = [...files, ...newFiles];
        }
        let media = files.map(file => {
            let m = new media_entity_1.Media();
            let stat = fs.statSync(file);
            m.path = file;
            m.size = stat.size;
            m.creationDate = stat.birthtime;
            m.duration = undefined;
            m.keywords = [];
            return m;
        });
        await this.mediaRepository.save(media);
    }
    async removeOne(id) {
        await this.mediaRepository.delete(id);
    }
    async removeMany(ids) {
        let media = (await this.mediaRepository.find()).filter(m => ids.includes(m.id));
        await this.mediaRepository.remove(media);
    }
    async create(createMediaDto) {
        let media = new media_entity_1.Media();
        media.path = createMediaDto.path;
        media.creationDate = new Date(2023, 12, 12, 0, 0, 0, 0);
        media.size = createMediaDto.size;
        media.keywords = createMediaDto.keywords;
        media.duration = createMediaDto.duration;
        await this.mediaRepository.save(media);
    }
};
exports.MediaService = MediaService;
exports.MediaService = MediaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(media_entity_1.Media)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MediaService);
//# sourceMappingURL=media.service.js.map