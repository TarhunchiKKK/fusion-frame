import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { IAlbum } from "../models"
import { AlbumService } from "../services/album.service"



// получение альбомов
export function useAlbums(name: string = ''){
    const [albums, setAlbums] = useState<IAlbum[]>([])                                 // альбомы
    const [loading, setLoading] = useState(false)                                      // флаг загрузки альбомов
    const [error, setError] = useState('')                                             // ошибка загрузки

    // загрузка альбомов
    async function fetchAlbums(){
        try{
            setError('')
            setLoading(true)

            let data: IAlbum[] = []
            if (name.length == 0){
                data = await AlbumService.getAll()
            }
            else {
                data = await AlbumService.getByName(name)
            }

            setAlbums(data)
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