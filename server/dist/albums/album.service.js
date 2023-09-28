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
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("./entities/album.entity");
const typeorm_2 = require("typeorm");
let AlbumService = class AlbumService {
    constructor(albumRepository) {
        this.albumRepository = albumRepository;
    }
    async getAll() {
        let count = await this.albumRepository.count();
        if (count == 0) {
            throw new common_1.BadRequestException('No albums');
        }
        let albums = await this.albumRepository.find({
            relations: {
                media: false,
            }
        });
        return albums.sort((a, b) => a.name < b.name ? 1 : -1);
    }
    async getOne(id) {
        return await this.albumRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                media: true,
            }
        });
    }
    async findByName(name) {
        let count = await this.albumRepository.count();
        if (count == 0) {
            throw new common_1.BadRequestException('No albums');
        }
        let albums = await this.albumRepository.find({
            relations: {
                media: false,
            }
        });
        return albums.filter(album => album.name.includes(name)).sort((a, b) => a.name < b.name ? 1 : -1);
    }
    async create(createAlbumDto) {
        const exist = this.albumRepository.findOne({
            where: {
                name: createAlbumDto.name,
            },
        });
        if (exist == null) {
            throw new common_1.BadRequestException('Album with such name already exists');
        }
        let album = new album_entity_1.Album();
        album.name = createAlbumDto.name;
        return await this.albumRepository.save(album);
    }
    async updateAlbumName(id, name) {
        let album = await this.albumRepository.findOne({
            where: {
                id: id,
            }
        });
        album.name = name;
        await this.albumRepository.update(id, album);
    }
    async remove(id) {
        await this.albumRepository.delete(id);
    }
    async addOneMediaToAlbum(id, media) {
        let album = await this.albumRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                media: true,
            }
        });
        if (!album.media.map(m => m.id).includes(media.id)) {
            album.media.push(media);
        }
        await this.albumRepository.save(album);
    }
    async addManyMediaToAlbum(id, media) {
        let album = await this.albumRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                media: true,
            }
        });
        for (let i = 0; i < media.length; i++) {
            if (!album.media.map(m => m.id).includes(media[i].id)) {
                album.media.push(media[i]);
            }
        }
        await this.albumRepository.save(album);
    }
};
exports.AlbumService = AlbumService;
exports.AlbumService = AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.Album)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AlbumService);
//# sourceMappingURL=album.service.js.map