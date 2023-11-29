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
exports.PathController = void 0;
const common_1 = require("@nestjs/common");
const path_service_1 = require("./path.service");
const create_path_dto_1 = require("./dto/create-path.dto");
const directory_dto_1 = require("./dto/directory.dto");
const date_dto_1 = require("./dto/date.dto");
let PathController = class PathController {
    constructor(pathService) {
        this.pathService = pathService;
    }
    getAll() {
        return this.pathService.findAll();
    }
    addPath(createPathDto) {
        return this.pathService.addPath(createPathDto);
    }
    removePath(id) {
        this.pathService.removePath(id);
    }
    openExplorer() {
        return this.pathService.openExplorer();
    }
    openDirectoryInExplorer(directoryDto) {
        this.pathService.openDirectoryInExplorer(directoryDto.path);
    }
    checkForNewFiles(dateDto) {
        let latestDate = new Date(dateDto.creationDate);
        return this.pathService.checkForNewFiles(latestDate);
    }
};
exports.PathController = PathController;
__decorate([
    (0, common_1.Get)('get'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PathController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_path_dto_1.CreatePathDto]),
    __metadata("design:returntype", Promise)
], PathController.prototype, "addPath", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PathController.prototype, "removePath", null);
__decorate([
    (0, common_1.Post)('explorer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], PathController.prototype, "openExplorer", null);
__decorate([
    (0, common_1.Post)('openinexplorer'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [directory_dto_1.DirectoryDto]),
    __metadata("design:returntype", void 0)
], PathController.prototype, "openDirectoryInExplorer", null);
__decorate([
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Query)('latestDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [date_dto_1.DateDto]),
    __metadata("design:returntype", Promise)
], PathController.prototype, "checkForNewFiles", null);
exports.PathController = PathController = __decorate([
    (0, common_1.Controller)('paths'),
    __metadata("design:paramtypes", [path_service_1.PathService])
], PathController);
//# sourceMappingURL=path.controller.js.map