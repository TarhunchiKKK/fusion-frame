import { Module, forwardRef } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MediaService } from "./media.service";
import { Media } from "./entities/media.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PathService } from "src/paths/path.service";
import { PathModule } from "src/paths/path.module";

@Module({
    imports: [TypeOrmModule.forFeature([Media])],
    controllers: [MediaController],
    providers: [MediaService],    
})
export class MediaModule {}