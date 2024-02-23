import { API } from "../api/axios.api";
import { IAddOneMediaDto, IAlbum, ICreateAlbumDto, IMedia, IUpdateAlbumDto } from "../models";

export const AlbumService = {
    async getAll(): Promise<IAlbum[]> {
        const { data } = await API.get<IAlbum[]>('albums/get')
        return data
    },

    async getOne(id: number): Promise<IAlbum> {
        const { data } = await API.get<IAlbum>(`albums/get/${id}`)
        return data
    },

    async getByName(albumName: string): Promise<IAlbum[]> {
        const { data } = await API.get<IAlbum[]>('albums/search', {
            params: {
                albumName: albumName
            }
        })
        return data
    },

    async create(name: string): Promise<IAlbum> {
        let createAlbumDto: ICreateAlbumDto = { name: name }
        const { data } = await API.post<IAlbum>('albums/create', createAlbumDto)
        return data
    },

    async updateAlbumName(id: number, albumName: string): Promise<void>{
        let updateAlbumDto: IUpdateAlbumDto = { id: id, name: albumName }
        await API.put('albums/updatename', updateAlbumDto)
    },

    async remove(id: number): Promise<void> {
        await API.delete(`albums/delete/${id}`)
    },

    async addOneMediaToAlbum(albumId: number, media: IMedia): Promise<void> {
        let addMediaDto: IAddOneMediaDto = { id: albumId, media: media }
        await API.post('albums/addonemedia', addMediaDto)
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