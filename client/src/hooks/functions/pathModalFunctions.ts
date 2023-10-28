import { useState } from "react";
import { IPath } from "../../models";
import { PathService } from "../../services/path.service";
import { AxiosError } from "axios";
import { MediaService } from "../../services/media.service";

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
    
    function RemovePathClosure(path: IPath){
        const inner = async () => {
            try{
                setError('')
                //await MediaService.removeDirectoryMedia(path.path)
                await PathService.removePath(path.id)
            } catch(error: unknown){
                setError((error as AxiosError).message)
            }
        }

        return inner
    }

    const openInExplorer = OpenInExplorerClosure(path.path)
    const removePath = RemovePathClosure(path)

    return { openInExplorer, removePath } 
}