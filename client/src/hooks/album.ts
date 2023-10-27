import { useEffect, useState } from "react";
import { IAlbum, IMedia } from "../models";
import { AlbumService } from "../services/album.service";
import { MediaService } from "../services/media.service";
import { AxiosError } from "axios";

export function useAlbum(id: number){
    const [name, setName] = useState<string>('')
    const [media, setMedia] = useState<IMedia[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    async function fetchAlbum(){
        try{
            setError('')
            setLoading(true)

            let album: IAlbum = await AlbumService.getOne(id)
            
            setName(album.name)
            setMedia(album.media)
            setLoading(false)
        } catch (error: unknown) {
            setLoading(false)
            setError((error as AxiosError).message)
        }
    }

    useEffect(() => {
        fetchAlbum()
    }, [])

    return { name, media,error, loading }
}