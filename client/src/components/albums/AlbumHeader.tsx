import { Link } from "react-router-dom";

interface AlbumProps{
    title: string
    editAlbum: () => void
    removeAlbum: () => void
}

export function AlbumHeader({ title, editAlbum, removeAlbum }: AlbumProps){
    return(
        <div className="flex flex-row justify-between w-full px-2 h-8">
            <Link to="/albums"><img src="/icons/arrow_left.svg" alt="Назад" className="w-8 h-8 rounded-full hover:bg-gray-300"/></Link>
            <span className="font-bold">{ title }</span>
            <div className="flex flex-row gap-2">
                <img src="/icons/edit.svg" alt="Изменить" onClick={editAlbum} className="w-8 h-8 rounded-full hover:bg-gray-300"/>
                <Link to="/albums" onClick={removeAlbum}><img src="/icons/basket.svg" alt="Удалить" className="w-8 h-8 rounded-full  hover:bg-gray-300"/></Link>
            </div>
        </div>
    )
}