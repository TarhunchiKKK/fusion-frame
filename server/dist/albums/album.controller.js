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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const create_album_dto_1 = require("./dto/create-album.dto");
const search_album_dto_1 = require("./dto/search-album.dto");
const update_album_dto_1 = require("./dto/update-album.dto");
const add_one_media_dto_1 = require("./dto/add-one-media.dto");
const add_many_media_dto_1 = require("./dto/add-many-media.dto");
const remove_media_from_album_dto_1 = require("./dto/remove-media-from-album.dto");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    getAll() {
        return this.albumService.getAll();
    }
    getOne(id) {
        return this.albumService.getOne(id);
    }
    getByName(searchAlbumDto) {
        return this.albumService.findByName(searchAlbumDto.name);
    }
    create(createAlbumDto) {
        return this.albumService.create(createAlbumDto);
    }
    updateAlbumName(updateAlbumDto) {
        this.albumService.updateAlbumName(updateAlbumDto.id, updateAlbumDto.name);
    }
    remove(id) {
        this.albumService.remove(id);
    }
    addOneMediaToAlbum(addMediaDto) {
        this.albumService.addOneMediaToAlbum(addMediaDto.id, addMediaDto.media);
    }
    addManyMediaToAlbum(addMediaDto) {
        this.albumService.addManyMediaToAlbum(addMediaDto.id, addMediaDto.media);
    }
    removeMediaFromAlbum(removeMediaFromAlbumDto) {
        this.albumService.removeMediaFromAlbum(removeMediaFromAlbumDto.albumId, removeMediaFromAlbumDto.media);
    }
    async clear() {
        this.albumService.clear();
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_album_dto_1.SearchAlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getByName", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_album_dto_1.CreateAlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('updatename'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_album_dto_1.UpdateAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "updateAlbumName", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('addonemedia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_one_media_dto_1.AddOneMediaDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "addOneMediaToAlbum", null);
__decorate([
    (0, common_1.Post)('addmanymedia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_many_media_dto_1.AddManyMediaDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "addManyMediaToAlbum", null);
__decorate([
    (0, common_1.Delete)('removemedia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_media_from_album_dto_1.RemoveMediaFromAlbumDto]),
    __metadata("design:returntype", void 0)
], AlbumController.prototype, "removeMediaFromAlbum", null);
__decorate([
    (0, common_1.Post)('clear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "clear", null);
exports.AlbumController = AlbumController = __decorate([
    (0, common_1.Controller)('albums'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map