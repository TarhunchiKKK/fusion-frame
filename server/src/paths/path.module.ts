import { Module } from "@nestjs/common";
import { PathController } from "./path.controller";
import { PathService } from "./path.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Path } from "./entities/path.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Path])],
    controllers: [PathController],
    providers: [PathService],
})
export class PathModule {}