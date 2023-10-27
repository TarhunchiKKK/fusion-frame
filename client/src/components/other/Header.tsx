import { useState } from "react";
import { Link } from "react-router-dom";
import { IAlbum, IMedia } from "../../models";

enum SearchedObjects {
    Media = 1,
    Albums = 2
}

interface HeaderProps{
    searchByMediaKeywords: (keywords: string[]) => Promise<IMedia[]> | undefined
    searchByAlbumName (name: string): Promise<IAlbum[]> | undefined
}

export function Header({ searchByMediaKeywords, searchByAlbumName }: HeaderProps){
    let searchedObjects: SearchedObjects = searchByMediaKeywords !== undefined ? SearchedObjects.Media : SearchedObjects.Albums
    const [searchModal, setSearchModal] = useState<boolean>(false)


    return(
        <header className="mx-auto bg-gradient-to-r from-indigo-500 to-blue-500">
            <nav className="pt-6 pb-4 flex justify-between">
                <img src="/icons/search.svg" title="Поиск" onClick={() => setSearchModal(true)}></img> 
                    <div className="space-x-8">
                        <Link to="/" className="bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500 hover:opacity-75">Фото</Link>
                        <Link to="/albums" className="bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500  border-2 border-purple-500 hover:opacity-75">Альбомы</Link>
                    </div>
                <img src="icons/dots.svg" alt=""></img>
            </nav>
            {/* { searchModal &&  } */}
        </header>
    )
}