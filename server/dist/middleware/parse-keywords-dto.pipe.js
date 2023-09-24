"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseKeywordsDtoPipe = void 0;
const common_1 = require("@nestjs/common");
const keywords_dto_1 = require("../media/dto/keywords.dto");
let ParseKeywordsDtoPipe = class ParseKeywordsDtoPipe {
    transform(value, metadata) {
        return new keywords_dto_1.KeywordsDto(value.split('*'));
    }
};
exports.ParseKeywordsDtoPipe = ParseKeywordsDtoPipe;
exports.ParseKeywordsDtoPipe = ParseKeywordsDtoPipe = __decorate([
    (0, common_1.Injectable)()
], ParseKeywordsDtoPipe);
//# sourceMappingURL=parse-keywords-dto.pipe.js.map