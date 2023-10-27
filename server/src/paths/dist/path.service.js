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
exports.PathService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var path_entity_1 = require("./entities/path.entity");
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
// function replaceSymbol(str: string, old_symbol: string, new_symbol: string) {
//     let new_str: string = "";
//     for(let c of str){
//         if(c == old_symbol) new_str += new_symbol;
//         else new_str += c;
//     }
//     return new_str;
// }
var PathService = /** @class */ (function () {
    function PathService(pathRepository) {
        this.pathRepository = pathRepository;
        this.formats = [
            '.svg', '.png', '.jpg', '.jpeg', '.gif', '.raw', '.tlff', '.jfif',
            '.mp4', '.avi', '.wmv'
        ];
        this.ExplorerHelper = {
            script: path.join(__dirname, '../../../helpers/explorer.py'),
            file: path.join(__dirname, '../../../helpers/explorer.txt')
        };
    }
    PathService.prototype.findAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var count;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pathRepository.count()];
                    case 1:
                        count = _a.sent();
                        if (count == 0) {
                            throw new common_1.BadRequestException('Np paths');
                        }
                        return [4 /*yield*/, this.pathRepository.find({})];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PathService.prototype.addPath = function (createPathDto) {
        return __awaiter(this, void 0, Promise, function () {
            var directory, exist, directoryStat, new_path;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        directory = createPathDto.path;
                        return [4 /*yield*/, this.pathRepository.findOne({
                                where: {
                                    path: directory
                                }
                            })];
                    case 1:
                        exist = _a.sent();
                        if (exist != null) {
                            throw new common_1.BadRequestException('This path is already added');
                        }
                        if (!fs.existsSync(directory)) return [3 /*break*/, 3];
                        directoryStat = fs.statSync(directory);
                        if (!directoryStat.isDirectory()) {
                            throw new common_1.BadRequestException('This path is not a directory');
                        }
                        new_path = new path_entity_1.Path();
                        new_path.path = directory;
                        return [4 /*yield*/, this.pathRepository.save(new_path)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: throw new common_1.BadRequestException('Path is not exist');
                }
            });
        });
    };
    PathService.prototype.removePath = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pathRepository["delete"](id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PathService.prototype.checkForNewFiles = function (latestDate) {
        return __awaiter(this, void 0, Promise, function () {
            var directories, newFiles, _i, directories_1, directory, files, _a, files_1, file, fullpath, stat, creationDate, extension;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.pathRepository.find()];
                    case 1:
                        directories = (_b.sent()).map(function (p) { return p.path; });
                        newFiles = [];
                        for (_i = 0, directories_1 = directories; _i < directories_1.length; _i++) {
                            directory = directories_1[_i];
                            files = fs.readdirSync(directory);
                            for (_a = 0, files_1 = files; _a < files_1.length; _a++) {
                                file = files_1[_a];
                                fullpath = path.join(directory, file);
                                stat = fs.statSync(fullpath);
                                creationDate = stat.birthtime;
                                extension = path.extname(fullpath);
                                if (creationDate > latestDate && this.formats.includes(extension)) {
                                    newFiles.push(fullpath);
                                }
                            }
                        }
                        return [2 /*return*/, newFiles];
                }
            });
        });
    };
    PathService.prototype.openExplorer = function () {
        try {
            var result = child_process.execSync("python " + this.ExplorerHelper.script, {
                encoding: 'utf-8'
            });
            var newDirectory = fs.readFileSync(this.ExplorerHelper.file, 'utf-8');
            return newDirectory;
        }
        catch (err) {
            console.log(err);
        }
        return '';
    };
    PathService.prototype.openDirectoryInExplorer = function (directory) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        directory = directory.replaceAll('/', '\\');
                        return [4 /*yield*/, child_process.exec("python " + this.ExplorerHelper.script + " " + directory, {
                                encoding: 'utf-8'
                            })];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // POSTMAN
    PathService.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.pathRepository.clear();
                return [2 /*return*/];
            });
        });
    };
    PathService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(path_entity_1.Path))
    ], PathService);
    return PathService;
}());
exports.PathService = PathService;
