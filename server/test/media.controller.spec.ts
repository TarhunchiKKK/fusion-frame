import {MediaController} from "../src/media/media.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {MediaService} from "../src/media/media.service";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Media} from "../src/media/entities/media.entity";
import {Repository} from "typeorm";

describe('MediaController', () => {
    let mediaController: MediaController
    let mediaService: MediaService
    let mediaRepository: Repository<Media>
    const MEDIA_REPOSITORY_TOKEN = getRepositoryToken(Media)


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MediaController],
            providers: [
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
            ],

        }).compile()

        mediaController = app.get<MediaController>(MediaController)
        mediaService = app.get<MediaService>(MediaService)
        mediaRepository = app.get<Repository<Media>>(MEDIA_REPOSITORY_TOKEN)
    })

    describe('Getting all media', () => {
        it('Should return all media', async () => {
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
            const response: Media[] = await mediaController.getAll()
            expect(response.length).toEqual(3)
        })
    })

    describe('Getting 1 media', () => {
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
            const response: Media = await mediaController.getOne(1)
            expect(response).toEqual({
                id: 1,
                path: "a",
                name: "a",
                size: 1,
                creationDate: new Date(1,1,1,1),
                keywords: [],
                duration: undefined,
                albums: []
            })
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
            const response: Media[] = await mediaController.findByKeywords(['bbb'])
            expect(response.length).toEqual(1)
            expect(response.findIndex(m => m.keywords.includes('bbb'))).toBeGreaterThan(-1)
        })
    })
})