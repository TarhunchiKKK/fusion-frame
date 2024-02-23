import {PathService} from "../src/paths/path.service";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import { Path } from "../src/paths/entities/path.entity";
import {Repository} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import * as fs from "fs";

describe('Path service', () =>{
    let pathService: PathService
    let pathRepository: Repository<Path>
    const PATH_REPOSITORY_TOKEN = getRepositoryToken(Path)

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PathService,
                {
                    provide: PATH_REPOSITORY_TOKEN,
                    useValue: {
                        count: jest.fn(),
                        find: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        delete: jest.fn()
                    }
                },
            ],
        }).compile()

        pathService = module.get<PathService>(PathService)
        pathRepository = module.get<Repository<Path>>(PATH_REPOSITORY_TOKEN)
    })

    it('Path service should be defined', () => {
        expect(pathService).toBeDefined()
    })

    it('Path repository should be defined', () =>{
        expect(pathRepository).toBeDefined()
    })

    describe('Adding path', () => {
        it('Should add new path', async () => {
            jest.spyOn(pathRepository, 'findOne').mockReturnValueOnce(null)
            await pathService.addPath({
                path: "D:/Машины"
            })
            expect(pathRepository.save).toHaveBeenCalledWith({path: "D:/Машины"})
        })

        it('Should generate exception that path is not directory', async () => {
            jest.spyOn(pathRepository, 'findOne').mockReturnValueOnce(null)
            jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false)
            try{
                await pathService.addPath({
                    path: "D:/Машины"
                })
            } catch(error){
                expect(typeof error).toEqual(typeof new BadRequestException)
                expect(error.message).toEqual('Path is not exist')
            }
        })

        it('Should generate exception that path is already in database', async () => {
            jest.spyOn(pathRepository, 'findOne').mockReturnValueOnce(
                new Promise((resolve, reject) => {
                    resolve({
                        id: 1,
                        path: "aaa"
                    })
                }))
            try{
                await pathService.addPath({
                    path: "D:/Машины"
                })
            } catch(error){
                expect(typeof error).toEqual(typeof new BadRequestException)
                expect(error.message).toEqual('This path is already added')
            }
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
            const result: Path[] = await pathService.findAll()
            expect(result.length).toEqual(3)
            expect(result.findIndex(p => p.id == 1)).toBeGreaterThan(-1)
            expect(result.findIndex(p => p.id == 2)).toBeGreaterThan(-1)
            expect(result.findIndex(p => p.id == 3)).toBeGreaterThan(-1)
        })
    })

    describe('Removing path', () => {
        it('Should remove path', async () => {
            await pathService.removePath(1)
            expect(pathRepository.delete).toHaveBeenCalledWith(1)
        })
    })
})