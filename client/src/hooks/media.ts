import { useEffect, useState } from "react";
import { IMedia } from "../models";
import { AxiosError } from "axios";
import { MediaService } from "../services/media.service";


export function useMedia(keywords: string[] = []) {
    const [media, setMedia] = useState<IMedia[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    console.log("keywords in useMedia")
    console.log(keywords)

    async function fetchMedia(){
        try{
            setError('')
            setLoading(true)

            let data: IMedia[] = []
            if (keywords.length == 0) {
                data = await MediaService.getAll()
                console.log("MediaService.getAll()")
            }
            else {
                data = await MediaService.findByKeywords(keywords)
                console.log("MediaService.findByKeywords()")
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

    console.log("Media in useMedia:")
    console.log(media)

    return { media, error, loading }
}