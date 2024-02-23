import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaModule } from './media/media.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media/entities/media.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AlbumModule } from './albums/album.module';
import { Album } from './albums/entities/album.entity';
import { Path } from './paths/entities/path.entity';
import { PathModule } from './paths/path.module';

@Module({
  imports: [
    MediaModule,
    AlbumModule,
    PathModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService:ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [Media, Album, Path],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
