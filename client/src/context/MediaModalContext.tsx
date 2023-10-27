import { createContext, useState } from "react"
import { IMedia } from "../models"
import { AxiosError } from "axios"
import { MediaService } from "../services/media.service"
import { AlbumService } from "../services/album.service"

interface IMediaModalContext{
    editKeywords: (mediaId: number, keywords: string[]) => Promise<void>
    addToAlbum: (albumId: number, media: IMedia) => Promise<void>
    removeMedia: (id: number) => Promise<void>
}

export const MediaModalContext = createContext<IMediaModalContext>({
    editKeywords: async (mediaId: number, keywords: string[]) => {},
    addToAlbum: async (albumId: number, media: IMedia) => {},
    removeMedia: async (id: number) => {}
})

export const MediaModalState = ({ children }: { children: React.ReactNode } ) => {
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const editKeywords = async (mediaId: number,  keywords: string[]) => {
        try{
            setError('')
            await MediaService.updateKeywords(mediaId, keywords)
        } catch(error: unknown){
            setError((error as AxiosError).message)
        }
    }

    const addToAlbum = async (albumId: number, media: IMedia) => {
        try{
            setError('')
            await AlbumService.addOneMediaToAlbum(albumId, media)
        } catch(error: unknown){
            setError((error as AxiosError).message)
        }
    }

    const removeMedia = async (id: number) => {
        try{
            setError('')
            await MediaService.removeOne(id)
        } catch(error: unknown){
            setError((error as AxiosError).message)
        }
    }

    return(
        <MediaModalContext.Provider value={{ editKeywords, addToAlbum, removeMedia }}>
            { children }
        </MediaModalContext.Provider>
    )
}