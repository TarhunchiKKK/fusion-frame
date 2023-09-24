import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Album])],
    controllers: [AlbumController],
    providers: [AlbumService],
})
export class AlbumModule {}