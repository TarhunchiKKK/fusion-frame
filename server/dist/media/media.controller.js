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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const media_service_1 = require("./media.service");
const remove_medias_dto_1 = require("./dto/remove-medias.dto");
const upload_media_dto_1 = require("./dto/upload-media.dto");
const update_keywords_dto_1 = require("./dto/update-keywords.dto");
const directory_dto_1 = require("../paths/dto/directory.dto");
let MediaController = class MediaController {
    constructor(mediaService) {
        this.mediaService = mediaService;
    }
    getAll() {
        return this.mediaService.getAll();
    }
    getOne(id) {
        return this.mediaService.getOne(id);
    }
    findByKeywords(keywords) {
        return this.mediaService.findByKeywords(keywords);
    }
    async updateKeywords(updateKeywordsDto) {
        this.mediaService.updateKeywords(updateKeywordsDto.id, updateKeywordsDto.keywords);
    }
    async getLatestDate() {
        return this.mediaService.getLatestDate();
    }
    loadMediaFromDirectory(directory) {
        this.mediaService.loadMediaFromDirectory(directory.path);
    }
    removeMediaFromDirectory(directory) {
        this.mediaService.removeDirectoryMedia(directory.path);
    }
    updateMediaFromDirectories(uploadMediaDto) {
        this.mediaService.updateMediaFromDirectories(uploadMediaDto.paths);
    }
    removeOne(id) {
        console.log(`Remove id = ${id}`);
        this.mediaService.removeOne(id);
    }
    removeMany(removeMediaDto) {
        this.mediaService.removeMany(removeMediaDto.ids);
    }
};
exports.MediaController = MediaController;
__decorate([
    (0, common_1.Get)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('keywords')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "findByKeywords", null);
__decorate([
    (0, common_1.Put)('updatekeywords'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_keywords_dto_1.UpdateKeywordsDto]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "updateKeywords", null);
__decorate([
    (0, common_1.Get)('latestdate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "getLatestDate", null);
__decorate([
    (0, common_1.Post)('loadmedia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [directory_dto_1.DirectoryDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "loadMediaFromDirectory", null);
__decorate([
    (0, common_1.Delete)('removedirectorymedia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [directory_dto_1.DirectoryDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "removeMediaFromDirectory", null);
__decorate([
    (0, common_1.Post)('uploadmedia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [upload_media_dto_1.UploadMediaDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "updateMediaFromDirectories", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "removeOne", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [remove_medias_dto_1.RemoveMediasDto]),
    __metadata("design:returntype", void 0)
], MediaController.prototype, "removeMany", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [media_service_1.MediaService])
], MediaController);
//# sourceMappingURL=media.controller.js.map