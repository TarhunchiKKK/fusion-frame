import { useEffect, useState } from "react";
import {getDefaultAlbum, IAlbum, IMedia} from "../models";
import { AlbumService } from "../services/album.service";
import { MediaService } from "../services/media.service";
import { AxiosError } from "axios";

export function useAlbum(id: number){
    const [album, setAlbum] = useState<IAlbum>(getDefaultAlbum())
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    async function fetchAlbum(){
        try{
            setError('')
            setLoading(true)

            let album: IAlbum = await AlbumService.getOne(id)

            setAlbum(album)

            setLoading(false)
        } catch (error: unknown) {
            setLoading(false)
            setError((error as AxiosError).message)
        }
    }

    useEffect(() => {
        fetchAlbum()
    }, [])

    return { album, error, loading, fetchAlbum }
}