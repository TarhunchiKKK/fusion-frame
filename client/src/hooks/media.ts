import { useEffect, useState } from "react";
import { IMedia } from "../models";
import axios, { AxiosError } from "axios";


function GetAllMediaStub(): IMedia[]{
    let media1: IMedia = {
        id: 1,
        path: "../images/Picture1.jfif",
        size: 35,
        creationDate: new Date(2023, 6, 5, 12, 14, 23, 0),
        keywords: [],
        duration: undefined
    }

    let media2: IMedia = {
        id: 2,
        path: "../images/Picture2.jfif",
        size: 41,
        creationDate: new Date(2023, 6, 5, 12, 9, 23, 0),
        keywords: [],
        duration: undefined
    }

    let media3: IMedia = {
        id: 3,
        path: "../images/Picture3.jfif",
        size: 35,
        creationDate: new Date(2023, 6, 5, 11, 9, 23, 0),
        keywords: [],
        duration: undefined
    }

    let media4: IMedia = {
        id: 4,
        path: "../images/Picture4.jfif",
        size: 189,
        creationDate: new Date(2023, 6, 3, 9, 9, 23, 0),
        keywords: [],
        duration: undefined
    }

    let media5: IMedia = {
        id: 5,
        path: "../images/Picture5.jfif",
        size: 35,
        creationDate: new Date(2023, 3, 5, 11, 9, 23, 0),
        keywords: [],
        duration: undefined
    }
    return [media1, media2, media3, media4, media5];
}

export function useMedia(){
    const [media, setMedia] = useState<IMedia[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchMedia(){
        try{
            setError('')
            setLoading(true)
            let response = await axios.get<IMedia[]>('http://localhost:3001/media/get')
            setMedia(response.data)
            //setMedia(GetAllMediaStub())
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