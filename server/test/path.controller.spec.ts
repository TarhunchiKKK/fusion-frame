import {AlbumController} from "../src/albums/album.controller";
import {AlbumService} from "../src/albums/album.service";
import {Repository} from "typeorm";
import {Album} from "../src/albums/entities/album.entity";
import {getRepositoryToken} from "@nestjs/typeorm";
import {Test, TestingModule} from "@nestjs/testing";
import {PathController} from "../src/paths/path.controller";
import {PathService} from "../src/paths/path.service";
import {Path} from "../src/paths/entities/path.entity";
import fs from "fs";
import {BadRequestException} from "@nestjs/common";

describe('PathController', () => {
    let pathController: PathController
    let pathService: PathService
    let pathRepository: Repository<Path>
    const PATH_REPOSITORY_TOKEN = getRepositoryToken(Path)


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PathController],
            providers: [
                PathService,
                {
                    provide: PATH_REPOSITORY_TOKEN,
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

        pathController = app.get<PathController>(PathController)
        pathService = app.get<PathService>(PathService)
        pathRepository = app.get<Repository<Path>>(PATH_REPOSITORY_TOKEN)
    })

    it('Path repository should be defined', () => {
        expect(pathRepository).toBeDefined()
    })

    it('Path service should be defined', () => {
        expect(pathService).toBeDefined()
    })

    it('Path controller should be defined', () => {
        expect(pathController).toBeDefined()
    })

    describe('Adding path', () => {
        it('Should add new path', async () => {
            jest.spyOn(pathRepository, 'findOne').mockReturnValueOnce(null)
            jest.spyOn(pathRepository, 'save').mockReturnValueOnce(new Promise<Path>((resolve, reject) => {
                resolve({
                    id: 1,
                    path: 'D:/Машины'
                })
            }))
            const response: Path = await pathController.addPath({path: 'D:/Машины'})
            expect(response).toEqual({
                id: 1,
                path: 'D:/Машины'
            })
        })
    })

    describe('Getting all paths', () => {
        it('Should return list of paths', async () => {
            jest.spyOn(pathRepository, 'count').mockReturnValueOnce(new Promise<number>((resolve, reject) => {
                resolve(1)
            }))
            jest.spyOn(pathRepository, 'find').mockReturnValueOnce(new Promise<Path[]>((resolve, reject) => {
                resolve([
                    {
                        id: 1,
                        path: "aaa"
                    },
                    {
                        id: 2,
                        path: "bbb"
                    },
                    {
                        id: 3,
                        path: "ccc"
                    }
                ])
            }))
            const response: Path[] = await pathController.getAll()
            expect(response.length).toEqual(3)
            expect(response.findIndex(p => p.id == 1)).toBeGreaterThan(-1)
            expect(response.findIndex(p => p.id == 2)).toBeGreaterThan(-1)
            expect(response.findIndex(p => p.id == 3)).toBeGreaterThan(-1)
        })
    })
})