import { useEffect, useState } from "react";
import { IMedia } from "../models";
import axios, { AxiosError } from "axios";
import { MediaService } from "../services/media.service";


export function useMedia(){
    const [media, setMedia] = useState<IMedia[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchMedia(){
        try{
            setError('')
            setLoading(true)
            let allMedia: IMedia[] = await MediaService.getAll()
            setMedia(allMedia)
            setLoading(false)
        } catch (error: unknown){
            setLoading(false)
            setError((error as AxiosError).message)
        }
    }

    useEffect(() => {
        fetchMedia()
    }, [])

    return { media, error, loading }
}