import { useEffect, useState } from "react";
import { IMedia } from "../models";
import axios, { AxiosError } from "axios";

export function useMedia(){
    const [media, setMedia] = useState<IMedia[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    function addMedia(m: IMedia){
        setMedia(prev => [...prev, m]);
    }

    async function fetchMedia(){
        try{
            setError('');
            setLoading(true);
            let response = await axios.get<IMedia[]>('http://localhost:3000/media');
            setMedia(response.data);
            setLoading(false);
        } catch (error: unknown){
            setLoading(false);
            setError((error as AxiosError).message);
        }
    }

    useEffect(() => {
        fetchMedia();
    }, []);

    return { media, error, loading, addMedia };
}