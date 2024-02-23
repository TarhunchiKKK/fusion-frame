"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MediaService = void 0;
var common_1 = require("@nestjs/common");
var media_entity_1 = require("./entities/media.entity");
var typeorm_1 = require("@nestjs/typeorm");
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
// const ImageStore: string = __dirname.substring(0, __dirname.length - 10) + 'client\\public'
function keywordsIntersection(a, b) {
    for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
        var word1 = a_1[_i];
        for (var _a = 0, b_1 = b; _a < b_1.length; _a++) {
            var word2 = b_1[_a];
            if (word1 == word2) {
                return true;
            }
        }
    }
    return false;
}
var MediaService = /** @class */ (function () {
    function MediaService(mediaRepository) {
        this.mediaRepository = mediaRepository;
        this.ImageStore = path.join(__dirname, '../../../client/public/images/');
        // форматы фото и видео файлов
        this.formats = [
            '.svg', '.png', '.jpg', '.jpeg', '.gif', '.raw', '.tlff', '.jfif',
            '.mp4', '.avi', '.wmv'
        ];
    }
    MediaService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var count, media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaRepository.count()];
                    case 1:
                        count = _a.sent();
                        if (count == 0) {
                            throw new common_1.BadRequestException('No photos and videos');
                        }
                        return [4 /*yield*/, this.mediaRepository.find()];
                    case 2:
                        media = _a.sent();
                        return [2 /*return*/, media.sort(function (a, b) { return a.creationDate < b.creationDate ? 1 : -1; })];
                }
            });
        });
    };
    MediaService.prototype.getOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaRepository.findOne({
                            where: {
                                id: id
                            }
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    MediaService.prototype.updateKeywords = function (id, keywords) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaRepository.findOne({
                            where: {
                                id: id
                            }
                        })];
                    case 1:
                        media = _a.sent();
                        media.keywords = keywords;
                        return [4 /*yield*/, this.mediaRepository.update(id, media)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.getLatestDate = function () {
        return __awaiter(this, void 0, Promise, function () {
            var media, latestDate, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaRepository.find()];
                    case 1:
                        media = _a.sent();
                        if (media.length == 0)
                            return [2 /*return*/, new Date(1990, 1, 1, 0, 0, 0, 0)];
                        else {
                            latestDate = media[0].creationDate;
                            for (i = 1; i < media.length; i++) {
                                if (media[i].creationDate > latestDate)
                                    latestDate = media[i].creationDate;
                            }
                            return [2 /*return*/, latestDate];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.findByKeywords = function (keywords) {
        return __awaiter(this, void 0, Promise, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaRepository.count()];
                    case 1:
                        count = _a.sent();
                        if (count == 0) {
                            throw new common_1.BadRequestException('No photos and videos');
                        }
                        return [4 /*yield*/, this.mediaRepository.find()];
                    case 2: return [2 /*return*/, (_a.sent())
                            .filter(function (a) { return keywordsIntersection(a.keywords, keywords); })
                            .sort(function (a, b) { return a.creationDate < b.creationDate ? 1 : -1; })];
                }
            });
        });
    };
    // подразумевается, что путь уже проверен на существование и то, что он является каталогом
    MediaService.prototype.loadMediaFromDirectory = function (directory) {
        return __awaiter(this, void 0, void 0, function () {
            var files, media;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        files = fs.readdirSync(directory).filter(function (file) {
                            return _this.formats.includes(path.extname(path.join(directory, file)));
                        });
                        // получить полные пути к файлам
                        files = files.map(function (file) { return path.join(directory, file); });
                        media = files.map(function (file) {
                            var m = new media_entity_1.Media();
                            var stat = fs.statSync(file);
                            //m.path = file.replaceAll('/', '\\');
                            m.path = file;
                            // new
                            var lastSlashIndex = m.path.lastIndexOf('/');
                            // let lastSlashIndex: number = m.path.lastIndexOf('\\');
                            m.name = m.path.substring(lastSlashIndex + 1);
                            fs.copyFile(m.path, _this.ImageStore + m.name, function (err) {
                                if (err)
                                    console.error(err);
                            });
                            // new
                            m.size = stat.size;
                            m.creationDate = stat.birthtime;
                            m.duration = undefined;
                            m.keywords = [];
                            //m.albums = [];
                            return m;
                        });
                        return [4 /*yield*/, this.mediaRepository.save(media)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // подразумевается, что пути уже проверены на существование
    MediaService.prototype.updateMediaFromDirectories = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var media, _i, files_1, file, m, stat, lastSlashIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        media = [];
                        for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                            file = files_1[_i];
                            m = new media_entity_1.Media();
                            stat = fs.statSync(file);
                            //m.path = file.replaceAll('/', '\\');
                            m.path = file;
                            lastSlashIndex = m.path.lastIndexOf('/');
                            m.name = m.path.substring(lastSlashIndex + 1);
                            fs.copyFile(m.path, this.ImageStore + m.name, function (err) {
                                if (err)
                                    console.error(err);
                            });
                            // new
                            m.size = stat.size;
                            m.creationDate = stat.birthtime;
                            m.duration = undefined;
                            m.keywords = [];
                            media.push(m);
                        }
                        return [4 /*yield*/, this.mediaRepository.save(media)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.removeOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaRepository.findOne({
                            where: {
                                id: id
                            }
                        })
                        // mnew
                    ];
                    case 1:
                        media = _a.sent();
                        // mnew
                        fs.rm(media.path, function (err) {
                            if (err)
                                console.error(err);
                        });
                        fs.rm(this.ImageStore + media.name, function (err) {
                            if (err)
                                console.error(err);
                        });
                        // new 
                        return [4 /*yield*/, this.mediaRepository["delete"](id)];
                    case 2:
                        // new 
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.removeMany = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var media, _i, media_1, m;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mediaRepository.find()];
                    case 1:
                        media = (_a.sent()).filter(function (m) { return ids.includes(m.id); });
                        // new
                        for (_i = 0, media_1 = media; _i < media_1.length; _i++) {
                            m = media_1[_i];
                            fs.rm(m.path, function (err) {
                                if (err)
                                    console.error(err);
                            });
                            fs.rm(this.ImageStore + m.name, function (err) {
                                if (err)
                                    console.error(err);
                            });
                        }
                        // new 
                        return [4 /*yield*/, this.mediaRepository.remove(media)];
                    case 2:
                        // new 
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // POSTMAN
    MediaService.prototype.create = function (createMediaDto) {
        return __awaiter(this, void 0, void 0, function () {
            var media;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        media = new media_entity_1.Media();
                        media.path = createMediaDto.path;
                        media.creationDate = new Date(2023, 12, 12, 0, 0, 0, 0);
                        media.size = createMediaDto.size;
                        media.keywords = createMediaDto.keywords;
                        media.duration = createMediaDto.duration;
                        return [4 /*yield*/, this.mediaRepository.save(media)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MediaService.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.mediaRepository.clear();
                return [2 /*return*/];
            });
        });
    };
    MediaService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(media_entity_1.Media))
    ], MediaService);
    return MediaService;
}());
exports.MediaService = MediaService;
