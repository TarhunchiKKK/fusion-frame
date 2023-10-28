import { useState } from "react";
import { Link } from "react-router-dom";
import { IAlbum, IMedia } from "../../models";
import { SearchModal } from "./SearchModal";

enum SearchedObjects {
    Media = 1,
    Albums = 2
}

interface HeaderProps{
    searchedValue: string
    searchedObjects: 'Albums' | 'Media'
    setValueToSearch: (value: string) => void
}

export function Header({ searchedValue, searchedObjects, setValueToSearch }: HeaderProps){
    const [searchModal, setSearchModal] = useState<boolean>(false)


    return(
        <header className="mx-auto bg-gradient-to-r from-indigo-500 to-blue-500">
            <nav className="pt-6 pb-4 flex justify-between">
                <img src="/icons/search.svg" title="Поиск" onClick={() => setSearchModal(true)} className="w-15 h-15 rounded-full hover:bg-gray-300"></img> 
                <div className="space-x-8">
                    <Link to="/" className="bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500 hover:opacity-75">Фото</Link>
                    <Link to="/albums" className="bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500  border-2 border-purple-500 hover:opacity-75">Альбомы</Link>
                </div>
                <img src="/icons/dots.svg" alt=""></img>
            </nav>
            { searchModal &&  <SearchModal input={searchedValue} searchedObjects={searchedObjects} setValueToSearch={setValueToSearch} close={() => setSearchModal(false)}></SearchModal>}
        </header>
    )
}