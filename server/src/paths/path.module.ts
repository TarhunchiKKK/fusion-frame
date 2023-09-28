import { Module, forwardRef } from "@nestjs/common";
import { PathController } from "./path.controller";
import { PathService } from "./path.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Path } from "./entities/path.entity";
import { MediaService } from "src/media/media.service";
import { MediaModule } from "src/media/media.module";

@Module({
    imports: [TypeOrmModule.forFeature([Path])],
    controllers: [PathController],
    providers: [PathService],
})
export class PathModule {}