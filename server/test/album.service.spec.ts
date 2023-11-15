import {AlbumService} from "../src/albums/album.service";
import {Repository} from "typeorm";
import {Album} from "../src/albums/entities/album.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Test, TestingModule} from "@nestjs/testing";
import {BadRequestException} from "@nestjs/common";

describe('Album service', () => {
    let albumService: AlbumService
    let albumRepository: Repository<Album>
    const ALBUM_REPOSITORY_TOKEN = getRepositoryToken(Album)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers:[

                AlbumService,
                {
                    provide: ALBUM_REPOSITORY_TOKEN,
                    useValue: {
                        count: jest.fn(),
                        find: jest.fn(),
                        findOne: jest.fn(),
                        save: jest.fn(),
                        update: jest.fn(),
                        delete: jest.fn(),
                    }
                }
            ]
        }).compile()

        albumService = module.get<AlbumService>(AlbumService)
        albumRepository = module.get<Repository<Album>>(ALBUM_REPOSITORY_TOKEN)
    })

    it('Album repository should be defined', () => {
        expect(albumRepository).toBeDefined()
    })

    it('Album service should be defined', () => {
        expect(albumService).toBeDefined()
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
            const result: Album = await albumService.create({name: 'aaa'})
            expect(albumRepository.findOne).toHaveBeenCalledWith({
                where: {
                    name: 'aaa'
                }
            })
            expect(albumRepository.save).toHaveBeenCalledWith({name:'aaa'})
            expect(result).toEqual({
                id: 1,
                name: 'aaa',
                media: []
            })
        })

        it('Should generate exception that so album already exists', async () => {
            jest.spyOn(albumRepository, 'findOne').mockReturnValueOnce(null)
            try{
                await albumService.create({name:'aaa'})
            } catch(error){
                expect(typeof error).toEqual(typeof new BadRequestException())
                expect(error.message).toEqual('Album with such name already exists')
            }
        })
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
            const result: Album[] = await albumService.getAll()
            expect(result.length).toEqual(2)
            expect(result.findIndex(a => a.id == 1)).toBeGreaterThan(-1)
            expect(result.findIndex(a => a.id == 2)).toBeGreaterThan(-1)
        })

        it('Should generate exception that database is empty', async () => {
            jest.spyOn(albumRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => resolve(0)))
            try{
                await albumService.getAll()
            } catch(error){
                expect(typeof error).toEqual(typeof new BadRequestException())
                expect(error.message).toEqual('No albums')
            }
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
            const result: Album = await albumService.getOne(1)
            expect(result).toEqual({
                id: 1,
                name: 'aaa',
                media: []
            })
            expect(albumRepository.findOne).toHaveBeenCalledWith({
                where:{
                    id: 1,
                },
                relations: {
                    media: true,
                }
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
            const result: Album[] = await albumService.findByName('aaa')
            expect(result.length).toEqual(1)
            expect(result.findIndex(a => a.name === 'aaa')).toBeGreaterThan(-1)
            expect(albumRepository.find).toHaveBeenCalledWith({
                    relations: {
                        media: false,
                    }
                })
        })

        it('Should generate exception that database is empty', async () => {
            jest.spyOn(albumRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => resolve(0)))
            try{
                await albumService.findByName('aaa')
            } catch(error){
                expect(typeof error).toEqual(typeof new BadRequestException())
                expect(error.message).toEqual('No albums')
            }
        })
    })

    describe('Updating album name', () => {
        it('Should update album name', async () => {
            jest.spyOn(albumRepository, 'findOne').mockReturnValueOnce(new Promise<Album>((resolve, reject) => {
                resolve({
                    id: 1,
                    name: 'aaa',
                    media: []
                })
            }))
            await albumService.updateAlbumName(1, 'bbb')
            expect(albumRepository.findOne).toHaveBeenCalledWith({
                where:{
                    id: 1
                }
            })
            expect(albumRepository.update).toHaveBeenCalledWith(1, {
                id: 1,
                name: 'bbb',
                media: []
            })
        })
    })

    describe('Removing media', () => {
        it('Should remove 1 media', async () => {
            await albumService.remove(1)
            expect(albumRepository.delete).toHaveBeenCalledWith(1)
        })
    })
})