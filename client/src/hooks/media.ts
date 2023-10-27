import { useEffect, useState } from "react";
import { IMedia } from "../models";
import { AxiosError } from "axios";
import { MediaService } from "../services/media.service";


export function useMedia(keywords: string[] = []) {
    const [media, setMedia] = useState<IMedia[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    async function fetchMedia(){
        try{
            setError('')
            setLoading(true)

            let data: IMedia[] = []
            if (keywords.length == 0) {
                data = await MediaService.getAll()
            }
            else {
                data = await MediaService.findByKeywords(keywords)
            }

            setMedia(data)
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