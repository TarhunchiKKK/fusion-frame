import { useState } from "react";
import { IPath } from "../../models";
import { PathService } from "../../services/path.service";
import { AxiosError } from "axios";

export function usePathFunctions(path: IPath){
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    function OpenInExplorerClosure(path: string){
        const inner = async () => {
            try{
                setError('')
                await PathService.openDirectoryInExplorer(path)
            } catch(error: unknown){
                setError((error as AxiosError).message)
            }
        }
        return inner
    }
    
    function RemovePathClosure(id: number){
        const inner = async () => {
            try{
                setError('')
                await PathService.removePath(id)
            } catch(error: unknown){
                setError((error as AxiosError).message)
            }
        }

        return inner
    }

    const openInExplorer = OpenInExplorerClosure(path.path)
    const removePath = RemovePathClosure(path.id)

    return { openInExplorer, removePath } 
}