import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { MediaService } from "./media.service";
import { KeywordsDto } from "./dto/keywords.dto"
import { ParseKeywordsDtoPipe } from "src/middleware/parse-keywords-dto.pipe";
import { Media } from "./entities/media.entity";

@Controller('media')
export class MediaController{

    constructor(private mediaService: MediaService) {}

}