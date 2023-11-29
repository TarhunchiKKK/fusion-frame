import { useState } from "react"
import { useChooseAlbumFunctions } from "../../hooks/functions/chooseAlbumFunctions"
import { IAlbum, IMedia } from "../../models"

interface AlbumNameProps{
    media: IMedia
    album: IAlbum
}

export function AlbumName({ media, album }: AlbumNameProps){
    const [isMediaInAlbum, setIsMediaInAlbum] = useState<boolean>(media.albums.map(album => album.id).includes(album.id))
    function changeIcon(){
        setIsMediaInAlbum(prev => !prev)
    }

    const { addMediaToAlbum, removeMediaFromAlbum } = useChooseAlbumFunctions(album.id, media)

    return(
        <div className="flex flex-row justify-between h-10 pt-2 hover:bg-indigo-400 hover:text-white">
            <span>{album.name}</span>
            { isMediaInAlbum && <img src="/icons/checkmark.svg"  alt="Убрать" onClick={() => {removeMediaFromAlbum(); changeIcon();}} className="w-8 h-8 rounded-full hover:bg-gray-300"/> }
            { !isMediaInAlbum &&  <img src="/icons/plus.svg" alt="Добавить" onClick={() => {addMediaToAlbum(); changeIcon();}} className="w-8 h-8 rounded-full hover:bg-gray-300"/> }
        </div>
    )
}