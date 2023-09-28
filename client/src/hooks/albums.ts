import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { IAlbum } from "../models";


export function useAlbums(){
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function addAlbum(album: IAlbum){
        setAlbums(prev => [...prev, album]);
    }

    async function fetchAlbums(){
        try{
            setError('');
            setLoading(true);
            let response = await axios.get<IAlbum[]>('http://localhost:3000/albums');
            setAlbums(response.data);
            setLoading(false);
        } catch(error: unknown){
            setLoading(false);
            setError((error as AxiosError).message);
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, []);

    return { albums, error, loading, addAlbum };
}