import { API } from "../api/axios.api";
import { IAddManyMediaDto, IAddOneMediaDto, IAlbum, ICreateAlbumDto, IMedia, ISearchAlbumDto, IUpdateAlbumDto } from "../models";

export const AlbumService = {
    async getAll(): Promise<IAlbum[]> {
        const { data } = await API.get<IAlbum[]>('albums/get')
        return data
    },

    async getOne(id: number): Promise<IAlbum> {
        const { data } = await API.get<IAlbum>(`albums/get/${id}`)
        return data
    },

    async getByName(name: string): Promise<IAlbum[]> {
        let searchAlbumDto: ISearchAlbumDto = { name: name }
        const { data } = await API.get<IAlbum[]>('albums/search', {
            data: searchAlbumDto
        })
        return data
    },

    async create(name: string): Promise<IAlbum> {
        let createAlbumDto: ICreateAlbumDto = { name: name }
        const { data } = await API.post<IAlbum>('albums/create', createAlbumDto)
        return data
    },

    async updateAlbumName(updateAlbumDto: IUpdateAlbumDto): Promise<void>{
        await API.put('albums/updatename', updateAlbumDto)
    },

    async remove(id: number): Promise<void> {
        await API.delete(`albums/delete/${id}`)
    },

    async addOneMediaToAlbum(albumId: number, media: IMedia): Promise<void> {
        let addMediaDto: IAddOneMediaDto = { id: albumId, media: media }
        await API.post('albums/addonemedia', addMediaDto)
    },

    async addManyMediaToAlbum(addMediaDto: IAddManyMediaDto): Promise<void> {
        await API.post('albums/addmanymedia', addMediaDto)
    },

    async removeMediaFromAlbum(albumId: number, media: IMedia): Promise<void> {
        await API.delete('albums/removemedia', {
            data: {
                albumId: albumId,
                media: media
            }
        })
        
    }
}