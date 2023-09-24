"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathModule = void 0;
const common_1 = require("@nestjs/common");
const path_controller_1 = require("./path.controller");
const path_service_1 = require("./path.service");
const typeorm_1 = require("@nestjs/typeorm");
const path_entity_1 = require("./entities/path.entity");
let PathModule = class PathModule {
};
exports.PathModule = PathModule;
exports.PathModule = PathModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([path_entity_1.Path])],
        controllers: [path_controller_1.PathController],
        providers: [path_service_1.PathService],
    })
], PathModule);
//# sourceMappingURL=path.module.js.map