import { IMedia } from "../../models"

interface MediaProps{
    media: IMedia
}

export function Media({media}: MediaProps){
    return(
        <div className="relative w-full sm:h-72 md:h-60 lg:h-52 xl:h-44">
            <img src="/images/Picture1.jfif" alt="" className="w-full h-full"></img>
            <div className="w-6 h-6 rounded-full border-2 border-white absolute right-1 bottom-1"></div>
        </div>
    )
}