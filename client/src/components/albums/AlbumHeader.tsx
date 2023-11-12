import { Link } from "react-router-dom";

interface AlbumProps{
    albumName: string
}

export function AlbumHeader({ albumName }: AlbumProps){
    return(
        <div className="flex flex-row justify-between w-full h-8">
            <Link to="/albums"><img src="/icons/arrow_left.svg" className="w-8 h-8 rounded-full hover:bg-gray-300"/></Link>
            <span className="font-bold">{ albumName }</span>
            <div>       </div>
        </div>
    )
}