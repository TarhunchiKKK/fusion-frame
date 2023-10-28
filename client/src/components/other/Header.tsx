import { useState } from "react";
import { Link } from "react-router-dom";
import { IAlbum, IMedia } from "../../models";
import { SearchModal } from "./SearchModal";

enum SearchedObjects {
    Media = 1,
    Albums = 2
}

interface HeaderProps{
    openSearchModal: () => void
    openPathsModal: () => void
}

export function Header({ openSearchModal, openPathsModal }: HeaderProps){
    return(
        <header className="mx-auto bg-gradient-to-r from-indigo-500 to-blue-500">
            <nav className="py-4 flex justify-between items-center">
                <img src="/icons/search_icon.svg" title="Поиск" onClick={openSearchModal} className="w-12 h-12 ml-4 rounded-full hover:bg-indigo-700"></img> 
                <div className="space-x-8">
                    <Link to="/" className="bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500 hover:opacity-75"> Фото  </Link>
                    <Link to="/albums" className="bg-gradient-to-r from-pink-500 to-yellow-500 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500  border-2 border-purple-500 hover:opacity-75">Альбомы</Link>
                </div>
                <img src="/icons/plus_bold.svg" title="Добавить каталог" onClick={openPathsModal} className="w-10 h-10 mr-4 rounded-full hover:bg-blue-700"></img>
            </nav>
        </header>
    )
}