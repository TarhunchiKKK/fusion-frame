import { useEffect, useState } from "react";
import { IMedia, getDefaultMedia } from "../models";
import { MediaService } from "../services/media.service";
import { AxiosError } from "axios";

export function useOneMedia(id: number) {
    const [media, setMedia] = useState<IMedia>(getDefaultMedia())
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    console.log("USe one media")

    async function fetchOneMedia(){
        try{
            setError('')
            setLoading(true)
            let data: IMedia = await MediaService.getOne(id)
            setMedia(data)
            setLoading(false)
        } catch (error: unknown){
            setLoading(false)
            setError((error as AxiosError).message)
        }
    }

    useEffect(() => {
        fetchOneMedia()
    }, [])

    return { media, error, loading }
}