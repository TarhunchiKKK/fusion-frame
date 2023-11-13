import { Collection } from "typescript";
import { API } from "../api/axios.api";
import { IMedia, IKeywordsDto, IUpdateKeywordsDto, ILoadMediaDto, IUploadMediaDto, IRemoveMediasDto, IDirectoryDto} from "../models";
import axios from "axios";
import { useState } from "react";

export const MediaService = {
    async getAll(): Promise<IMedia[]>{
        const { data } = await API.get<IMedia[]>('media/get')
        return data
    },

    async getOne(id: number) : Promise<IMedia>{
        const { data } = await API.get<IMedia>(`media/get/${id}`)
        return data
    },

    async findByKeywords(keywords: string[]): Promise<IMedia[]>{
        const { data } = await API.get<IMedia[]>('media/search', {
            params: {
                keywords: keywords,
            }
        })
        return data
    },

    async updateKeywords(id: number, keywords: string[]): Promise<void>{
        let updateKeywordsDto: IUpdateKeywordsDto = { id: id, keywords: keywords }
        await API.put('media/updatekeywords', updateKeywordsDto)
    },

    async getLatestDate(): Promise<Date>{
        const { data } = await API.get('media/latestdate')
        return data
    },

    async loadMediaFromDirectory(path: string): Promise<void>{
        let loadMediaDto: ILoadMediaDto = { path: path}
        await API.post('media/loadmedia', loadMediaDto)
    },

    async removeDirectoryMedia(path: string): Promise<void>{
        let directoryDto:IDirectoryDto = { path: path }
        await API.delete('media/removedirectorymedia',{
            data: directoryDto
        })
    },

    async updateMediaFromDirectories(directories: string[], latestDate: Date): Promise<void>{
        let uploadMediaDto: IUploadMediaDto = { paths: directories, latestDate: latestDate }
        await API.post('media/uploadmedia', uploadMediaDto)
    },

    async removeOne(id: number): Promise<void>{
        await API.delete(`media/delete/${id}`)
    },

    async removeMany(removeMediaDto: IRemoveMediasDto): Promise<void>{
        await API.delete('media/remove', {
            data: removeMediaDto
        })
    }
}