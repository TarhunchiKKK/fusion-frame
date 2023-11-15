import {MediaController} from "../src/media/media.controller";
import {MediaService} from "../src/media/media.service";
import {Repository} from "typeorm";
import {Media} from "../src/media/entities/media.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Test, TestingModule} from "@nestjs/testing";
import {AlbumController} from "../src/albums/album.controller";
import {AlbumService} from "../src/albums/album.service";
import {Album} from "../src/albums/entities/album.entity";
import {BadRequestException} from "@nestjs/common";

describe('AlbumController', () => {
    let albumController: AlbumController
    let albumService: AlbumService
    let albumRepository: Repository<Album>
    const ALBUM_REPOSITORY_TOKEN = getRepositoryToken(Album)


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AlbumController],
            providers: [
                AlbumService,
                {
                    provide: ALBUM_REPOSITORY_TOKEN,
                    useValue: {
                        count: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        update: jest.fn(),
                        save: jest.fn(),
                        remove: jest.fn(),
                        delete: jest.fn(),
                    }
                },
            ],

        }).compile()

        albumController = app.get<AlbumController>(AlbumController)
        albumService = app.get<AlbumService>(AlbumService)
        albumRepository = app.get<Repository<Album>>(ALBUM_REPOSITORY_TOKEN)
    })

    it('Album repository should be defined', () => {
        expect(albumRepository).toBeDefined()
    })

    it('Album service should be defined', () => {
        expect(albumService).toBeDefined()
    })

    it('Album controller should be defined', () => {
        expect(albumController).toBeDefined()
    })

    describe('Getting all albums',() => {
        it('Should return list of albums', async () => {
            jest.spyOn(albumRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => resolve(1)))
            jest.spyOn(albumRepository, 'find').mockReturnValueOnce(new Promise<Album[]>((resolve, reject) => {
                resolve([
                    {
                        id: 1,
                        name: 'aaa',
                        media: []
                    },
                    {
                        id: 2,
                        name: 'bbb',
                        media: []
                    }
                ])
            }))
            const response: Album[] = await albumController.getAll()
            expect(response.length).toEqual(2)
            expect(response.findIndex(a => a.id == 1)).toBeGreaterThan(-1)
            expect(response.findIndex(a => a.id == 2)).toBeGreaterThan(-1)
        })
    })

    describe('Getting 1 album', () => {
        it('Should return 1 album', async () => {
            jest.spyOn(albumRepository, 'findOne').mockReturnValueOnce(new Promise<Album>((resolve, reject) => [
                resolve({
                    id: 1,
                    name: 'aaa',
                    media: []
                })
            ]))
            const response: Album = await albumController.getOne(1)
            expect(response).toEqual({
                id: 1,
                name: 'aaa',
                media: []
            })
        })
    });

    describe('Search albums by name', () => {
        it('Should return list of albums', async () => {
            jest.spyOn(albumRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => resolve(100)))
            jest.spyOn(albumRepository, 'find').mockReturnValueOnce(new Promise<Album[]>((resolve, reject) => {
                resolve([
                    {
                        id: 1,
                        name: 'aaa',
                        media: []
                    },
                    {
                        id: 2,
                        name: 'bbb',
                        media: []
                    }
                ])
            }))
            const response: Album[] = await albumController.getByName('aaa')
            expect(response.length).toEqual(1)
            expect(response.findIndex(a => a.name === 'aaa')).toBeGreaterThan(-1)
        })
    })

    describe('Creating album', () => {
        it('Should create album and add it to database', async () => {
            jest.spyOn(albumRepository, 'findOne').mockReturnValueOnce(new Promise<Album>((resolve, reject) => {
                resolve({
                    id: 1,
                    name: 'aaa',
                    media: []
                })
            }))
            jest.spyOn(albumRepository, 'save').mockReturnValueOnce(new Promise<Album>((resolve, reject) => {
                resolve({
                    id: 1,
                    name: 'aaa',
                    media: []
                })
            }))
            const response: Album = await albumController.create({name: 'aaa'})
            expect(response).toEqual({
                id: 1,
                name: 'aaa',
                media: []
            })
        })

    })
})