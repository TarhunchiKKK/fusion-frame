import { useState } from "react"
import { IMedia } from "../../models"
import { AlbumService } from "../../services/album.service"
import { AxiosError } from "axios"

export function useChooseAlbumFunctions(albumId: number, media: IMedia){
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    function AddMediaToAlbumClosure(albumId: number, media: IMedia){
        const inner = async () => {
            try{
                setError('')
                await AlbumService.addOneMediaToAlbum(albumId, media)
            } catch (error: unknown){
                setError((error as AxiosError).message)
            }
        }
        return inner
    }

    function RemoveMediaFromAlbumClosure(albumId: number, media: IMedia){
        const inner = async () => {
            try{
                setError('')
                await AlbumService.removeMediaFromAlbum(albumId, media)
            } catch (error: unknown){
                setError((error as AxiosError).message)
            }
        }
        return inner
    }


    const addMediaToAlbum = AddMediaToAlbumClosure(albumId, media)
    const removeMediaFromAlbum = RemoveMediaFromAlbumClosure(albumId, media)

    return { addMediaToAlbum, removeMediaFromAlbum }
}