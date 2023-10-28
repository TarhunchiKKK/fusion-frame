import { useEffect, useState } from "react";
import { IPath } from "../models";
import { PathService } from "../services/path.service";
import { AxiosError } from "axios";

export function usePaths() {
    const [paths, setPaths] = useState<IPath[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    async function fetchPaths() {
        try{
            setError('')
            setLoading(true)
            let data: IPath[] = await PathService.getAll()
            setPaths(data)
            setLoading(false)
        } catch(error: unknown){
            setLoading(false)
            setError((error as AxiosError).message)
        }
    }
    
    useEffect(() => {
        fetchPaths()
    }, [])
   
    return { paths, setPaths, error, loading }
}