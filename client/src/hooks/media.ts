import { useEffect, useState } from "react";
import { IMedia } from "../models";
import { AxiosError } from "axios";
import { MediaService } from "../services/media.service";

export function trimMediaDates(media: IMedia[]): IMedia[] {
    for (let m of media){
        m.creationDate = m.creationDate.substring(0, 10)
        m.path = '../src/images/Picture1.jfif'
    }
    return media
}


export function splitMediaByDate(media: IMedia[]): IMedia[][]{    
    media = trimMediaDates(media)


    let dates: string[] = []
    for(let m of media){
        if (!dates.includes(m.creationDate)){
            dates.push(m.creationDate)
        }
    }
   
    // массив медиа, разбитый по времени создания
    let splitedMedia: IMedia[][] = []
    for(let date of dates){
        let mediaByDate: IMedia[] = media.filter(m => m.creationDate === date);
        splitedMedia.push(mediaByDate)
    }

    return splitedMedia
}


export function useMedia(keywords: string[] = []) {
    const [media, setMedia] = useState<IMedia[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    

    async function fetchMedia(keywords: string[]){
        try{
            setError('')
            setLoading(true)
            

            let data: IMedia[] = []
            if (keywords.length === 0) {
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
        fetchMedia(keywords)
    }, [])


    // массив медиа, разбитый по времени создания
    let mediaByDate: IMedia[][] = splitMediaByDate(media);

    return { mediaByDate, error, loading, fetchMedia }
}