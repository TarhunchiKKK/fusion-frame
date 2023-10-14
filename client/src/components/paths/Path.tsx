import axios from "axios"
import { IDirectoryDto, IPath } from "../../models"

interface IPathProps{
    path: IPath
}

const directoryDto: IDirectoryDto = {
    path: '',
}

export function Path({path}: IPathProps){
    async function seeDirectory(){
        directoryDto.path = path.path
        await axios.post('localhost:3000/paths/openinexplorer', directoryDto)
    }

    async function removeDirectory(){
        await axios.delete(`localhost:3000/paths/${path.id}`)
    }

    return(
        <div className="flex flex-row justify-between align-aenter w-full h-5 border-2 border-black bg-slate-400 hover:bg-orange-400">
            <span className="italic"></span>
            <div>
                <img src="../../icons/eye.svg" alt="" className="mr-3" onClick={seeDirectory} />
                <img src="../../icons/basket.svg" alt="" onClick={removeDirectory} />
            </div>
        </div>
    )
}