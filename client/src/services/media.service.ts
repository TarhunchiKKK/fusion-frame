import { Collection } from "typescript";
import { API } from "../api/axios.api";
import { IMedia, IKeywordsDto, IUpdateKeywordsDto, ILoadMediaDto, IUploadMediaDto, IRemoveMediasDto} from "../models";
import axios from "axios";
import { useState } from "react";

export const MediaService = {
    async getAll(): Promise<IMedia[]>{
        //const { data } = await axios.get<IMedia[]>('http://localhost:3001/media/get')
        const { data } = await API.get<IMedia[]>('media/get')
        return data
    },

    async getOne(id: number) : Promise<IMedia>{
        const { data } = await API.get<IMedia>(`media/get/${id}`)
        return data
    },

    async findByKeywords(keywords: string[]): Promise<IMedia[]>{
        let keywordsDto: IKeywordsDto = { keywords: keywords }
        const { data } = await API.get<IMedia[]>('media/search', {
            data:keywordsDto,
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

    async loadMediaFromDirectory(directory: ILoadMediaDto): Promise<void>{
        await API.post('media/', directory)
    },

    async updateMediaFromDirectories(uploadMediaDto: IUploadMediaDto): Promise<void>{
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