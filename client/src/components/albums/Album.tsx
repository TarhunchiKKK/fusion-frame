import { IAlbum } from "../../models";

interface IAlbumProps{
    album: IAlbum
}

export function Album({ album }: IAlbumProps){
    return(
        <div className="flex flex-row rounded-full hover:bg-gray-600 relative w-full sm:h-72 md:h-60 lg:h-52 xl:h-44">
            <div className="flex flex-row justify-end">
                <img src="../../icons/dots.svg" alt="" />
            </div>
            <img src="../../icons/album.svg" alt="" />
            <span className="text-center">{ album.name }</span>
        </div>
    )
}