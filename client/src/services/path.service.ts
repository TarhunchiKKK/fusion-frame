import { API } from "../api/axios.api";
import { ICreatePathDto, IDateDto, IDirectoryDto, IPath } from "../models";

export const PathService = {
    async getAll(): Promise<IPath[]> {
        const { data } = await API.get<IPath[]>('paths/get')
        return data
    },

    async addPath(path: string): Promise<IPath> {
        let createPathDto: ICreatePathDto = { path: path }
        const { data } = await API.post<IPath>('paths/add', createPathDto)
        return data
    },

    async removePath(id: number): Promise<void> {
        await API.delete<void>(`paths/delete/${id}`)
    },

    async openExplorer(): Promise<string> {
        const { data } =  await API.post('paths/explorer')
        return data
    },

    async openDirectoryInExplorer(path: string): Promise<void> {
        let directoryDto: IDirectoryDto = { path: path }
        await API.post('paths/openinexplorer', directoryDto)
    },

    async checkForNewFiles(latestDate: Date): Promise<string[]> {
        let dateDto: IDateDto = { creationDate: latestDate.toString() };
        const { data } = await API.get<string[]>('paths/check', {
            params:{
                latestDate: dateDto,
            }
        })
        return data
    }
}