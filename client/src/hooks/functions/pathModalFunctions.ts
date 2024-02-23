import { useState } from "react";
import { IPath } from "../../models";
import { PathService } from "../../services/path.service";
import { AxiosError } from "axios";

export function usePathFunctions(path: IPath){
    const [error, setError] = useState<string>('')

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
    
    function RemovePathClosure(path: IPath){
        const inner = async () => {
            try{
                setError('')
                await PathService.removePath(path.id)
            } catch(error: unknown){
                setError((error as AxiosError).message)
            }
        }

        return inner
    }

    const openInExplorer = OpenInExplorerClosure(path.path)
    const removePath = RemovePathClosure(path)

    return { openInExplorer, error, removePath }
}