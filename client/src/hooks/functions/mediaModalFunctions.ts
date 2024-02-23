import { useState } from "react"
import { MediaService } from "../../services/media.service"
import { AxiosError } from "axios"
import { IMedia } from "../../models"
import { AlbumService } from "../../services/album.service"

export function useMediaModalFunctions(media: IMedia){

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    function EditKeywodsClosure(mediaId: number){
        const inner = async (keywords: string[]) => {
            try{
                setError('')
                await MediaService.updateKeywords(mediaId, keywords)
            } catch(error: unknown){
                setError((error as AxiosError).message)
            }
        }

        return inner
    }

    function AddToAlbumClosure(media: IMedia){

        const inner = async (albumId: number) => {
            try{
                setError('')
                await AlbumService.addOneMediaToAlbum(albumId, media)
            } catch(error: unknown){
                setError((error as AxiosError).message)
            }
        }
        return inner
    }

    
    function RemoveMediaClosure(id: number){
        const inner = async () => {
            try{
                setError('')
                await MediaService.removeOne(id)
            } catch(error: unknown){
                setError((error as AxiosError).message)
            }
        }
        return inner
    }

    const editKeywords = EditKeywodsClosure(media?.id)
    const addToAlbum = AddToAlbumClosure(media)
    const removeMedia = RemoveMediaClosure(media?.id)
    

    return { editKeywords, addToAlbum, removeMedia }
}