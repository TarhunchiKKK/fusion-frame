import {MediaService} from "../src/media/media.service";
import {Media} from "../src/media/entities/media.entity";
import {Repository} from "typeorm";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Test, TestingModule} from "@nestjs/testing";
import {BadRequestException} from "@nestjs/common";

describe('MediaService', () => {
    let mediaService: MediaService
    let mediaRepository: Repository<Media>
    const MEDIA_REPOSITORY_TOKEN = getRepositoryToken(Media)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                MediaService,
                {
                    provide: MEDIA_REPOSITORY_TOKEN,
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
            ]
        }).compile()

        mediaService = module.get<MediaService>(MediaService)
        mediaRepository = module.get<Repository<Media>>(MEDIA_REPOSITORY_TOKEN)
    })

    it('Media service should be defined', () => {
        expect(mediaService).toBeDefined()
    })

    it('Media repository should be defined', () => {
        expect(mediaRepository).toBeDefined()
    })

    describe('Getting all media from database', () => {
        it('Should return list of media', async () => {
            jest.spyOn(mediaRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => {
                resolve(3)
            }))
            jest.spyOn(mediaRepository, 'find').mockReturnValueOnce(new Promise<Media[]>((resolve, reject) => {
                resolve([
                    {
                        id: 1,
                        path: "a",
                        name: "a",
                        size: 1,
                        creationDate: new Date(Date.now()),
                        keywords: [],
                        duration: undefined,
                        albums: []
                    },
                    {
                        id: 2,
                        path: "b",
                        name: "b",
                        size: 2,
                        creationDate: new Date(Date.now()),
                        keywords: [],
                        duration: undefined,
                        albums: []
                    },
                    {
                        id: 3,
                        path: "c",
                        name: "c",
                        size: 3,
                        creationDate: new Date(Date.now()),
                        keywords: [],
                        duration: undefined,
                        albums: []
                    }
                ])
            }))
            const result: Media[] = await mediaService.getAll()
            expect(result.length).toEqual(3)
            expect(result.findIndex(m => m.id == 1)).toBeGreaterThan(-1)
            expect(result.findIndex(m => m.id == 2)).toBeGreaterThan(-1)
            expect(result.findIndex(m => m.id == 3)).toBeGreaterThan(-1)
        })

        it('Should generate exception that database is empty', async () => {
            jest.spyOn(mediaRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => resolve(0)))
            try{
                await mediaService.getAll()
            } catch(error){
                expect(typeof error).toEqual(typeof new BadRequestException())
                expect(error.message).toEqual('No photos and videos')
            }
        })
    })

    describe('Getting 1 media from database', () =>{
        it('Should return 1 media', async () => {
            jest.spyOn(mediaRepository, 'findOne').mockReturnValueOnce(new Promise<Media>((resolve, reject) => {
                resolve({
                    id: 1,
                    path: "a",
                    name: "a",
                    size: 1,
                    creationDate: new Date(1,1,1,1),
                    keywords: [],
                    duration: undefined,
                    albums: []
                })
            }))
            const result: Media = await mediaService.getOne(1)
            expect(result).toEqual({
                id: 1,
                path: "a",
                name: "a",
                size: 1,
                creationDate: new Date(1,1,1,1),
                keywords: [],
                duration: undefined,
                albums: []
            })
            expect(mediaRepository.findOne).toBeCalledWith({
                where: {
                    id: 1,
                },
                relations: {
                    albums: true,
                }
            })
        })
    })

    describe('Updating media keywords', () => {
        it('Should update media keywords', async () => {
            jest.spyOn(mediaRepository, 'findOne').mockReturnValueOnce(new Promise<Media>((resolve, reject) => {
                resolve({
                    id: 1,
                    path: "a",
                    name: "a",
                    size: 1,
                    creationDate: new Date(1,1,1,1),
                    keywords: [],
                    duration: undefined,
                    albums: []
                })
            }))
            await mediaService.updateKeywords(1, ['aaa', 'bbb'])
            expect(mediaRepository.findOne).toBeCalledWith({
                where: {
                    id: 1,
                },
            })
            expect(mediaRepository.update).toBeCalledWith(1, {
                id: 1,
                path: "a",
                name: "a",
                size: 1,
                creationDate: new Date(1,1,1,1),
                keywords: ['aaa', 'bbb'],
                duration: undefined,
                albums: []
            })
        })
    })

    describe('Removing media', () => {
        it('Should remove media from database', async () => {
            jest.spyOn(mediaRepository, 'findOne').mockReturnValueOnce(new Promise<Media>((resolve, reject) => {
                resolve({
                    id: 1,
                    path: "a",
                    name: "a",
                    size: 1,
                    creationDate: new Date(Date.now()),
                    keywords: [],
                    duration: undefined,
                    albums: []
                })
            }))
            await mediaService.removeOne(1)
            expect(mediaRepository.findOne).toBeCalledWith({
                where: {
                    id: 1,
                }
            })
            expect(mediaRepository.delete).toBeCalledWith(1)
        })
    })

    describe('Search media by keywords', () => {
        it('Should return list of media', async () => {
            jest.spyOn(mediaRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => resolve(100)))
            jest.spyOn(mediaRepository, 'find').mockReturnValueOnce(new Promise<Media[]>((resolve, reject) => {
                resolve([
                    {
                        id: 1,
                        path: "a",
                        name: "a",
                        size: 1,
                        creationDate: new Date(Date.now()),
                        keywords: ['aaa'],
                        duration: undefined,
                        albums: []
                    },
                    {
                        id: 2,
                        path: "b",
                        name: "b",
                        size: 2,
                        creationDate: new Date(Date.now()),
                        keywords: ['bbb'],
                        duration: undefined,
                        albums: []
                    }
                ])
            }))
            const result: Media[] = await mediaService.findByKeywords(['bbb'])
            expect(result.length).toEqual(1)
            expect(result.findIndex(m => m.keywords.includes('bbb'))).toBeGreaterThan(-1)
        })

        it('Should generate exception that no media in database', async () => {
            jest.spyOn(mediaRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => resolve(0)))
            try{
                const result: Media[] = await mediaService.findByKeywords(['bbb'])
            } catch(error){
                expect(typeof error).toEqual(typeof new BadRequestException())
                expect(error.message).toEqual('No photos and videos')
            }
        })
    })
})