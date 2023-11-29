import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { IAlbum } from "../models"
import { AlbumService } from "../services/album.service"

// получение альбомов
export function useAlbums(albumName: string = ''){
    const [albums, setAlbums] = useState<IAlbum[]>([])                                 // альбомы
    const [loading, setLoading] = useState(false)                                      // флаг загрузки альбомов
    const [error, setError] = useState('')                                             // ошибка загрузки

    // загрузка альбомов
    async function fetchAlbums(albumName: string){
        try{
            setError('')
            setLoading(true)

            let data: IAlbum[] = []
            if (albumName === ''){
                data = await AlbumService.getAll()
            }
            else {
                data = await AlbumService.getByName(albumName)
            }

            setAlbums(data)
            setLoading(false)
        } catch(error: unknown){
            setLoading(false)
            setError((error as AxiosError).message)
        }
    }

    useEffect(() => {
        fetchAlbums(albumName)
    }, [])

    return { albums, setAlbums, error, loading, fetchAlbums }
}