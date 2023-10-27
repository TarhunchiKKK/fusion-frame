import axios from "axios"
import { IDirectoryDto, IPath } from "../../models"
import { usePathFunctions } from "../../hooks/functions/pathModalFunctions"

interface IPathProps{
    path: IPath
}


export function Path({ path }: IPathProps){

    const { openInExplorer, removePath } = usePathFunctions(path)

    return(
       <div className="flex flex-row justify-between items-center h-10 pt-2 hover:bg-red-400 hover:text-white">
            <span>{path.path}</span>
            <div className="flex flex-row items-center">
                <img src="icons/eye.svg" alt="" onClick={openInExplorer} className="w-8 h-8 rounded-full hover:bg-red-500"/>
                <img src="icons/basket.svg" alt="" onClick={removePath} className="w-8 h-8 rounded-full ml-4 hover:bg-red-500"/>
            </div>
        </div>
    )
}