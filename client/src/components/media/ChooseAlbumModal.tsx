import { useAlbums } from "../../hooks/albums"
import { IMedia } from "../../models"
import { AlbumName } from "./AlbumName"

interface ChooseAlbumModalProps{
    media: IMedia
    close: () => void
}

export function ChooseAlbumModal({ media, close }: ChooseAlbumModalProps){
    const { albums, error, loading } = useAlbums()

    return(
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0" onClick={close}></div>
            <div className="container w-[500]px mx-auto mt-2 mb-4 w-2/5 p-5 
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
                <div className="flex flex-row justify-end w-full">
                    <img src="/icons/exit.svg" onClick={close} className="w-8 h-8 rounded-full hover:bg-gray-300" />
                </div>
                <div className="flex flex-col justify-around mx-auto border w-11/12 mt-3 mb-2 bg-gray-200">
                    { albums.map(album => <AlbumName album={album} media={media} key={album.id}></AlbumName>) }                    
                </div>
            </div>
        </>
    )
}