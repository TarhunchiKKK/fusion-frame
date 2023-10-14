import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { IAlbum } from "../models"



// получение альбомов
export function useAlbums(){
    const [albums, setAlbums] = useState<IAlbum[]>([])                                 // альбомы
    const [loading, setLoading] = useState(false)                                      // флаг загрузки альбомов
    const [error, setError] = useState('')                                             // ошибка загрузки

    // загрузка альбомов
    async function fetchAlbums(){
        try{
            setError('')
            setLoading(true)
            let response = await axios.get<IAlbum[]>('http://localhost:3000/albums')
            setAlbums(response.data)
            setLoading(false)
        } catch(error: unknown){
            setLoading(false)
            setError((error as AxiosError).message)
        }
    }

    useEffect(() => {
        fetchAlbums()
    }, [])

    return { albums, error, loading }
}