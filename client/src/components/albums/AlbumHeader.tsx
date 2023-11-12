import { Link } from "react-router-dom";
import {useState} from "react";

interface AlbumProps{
    title: string
    editAlbumName: () => void
    removeAlbum: () => void
}

export function AlbumHeader({ title, editAlbumName, removeAlbum }: AlbumProps){
    return(
        <div className="flex flex-row justify-between w-full h-8">
            <Link to="/albums"><img src="/icons/arrow_left.svg" className="w-8 h-8 rounded-full hover:bg-gray-300"/></Link>
            <span className="font-bold">{ title }</span>
            <div>
                <img src="/icons/edit.svg" onClick={editAlbumName} className="w-8 h-8 rounded-full hover:bg-gray-300"/>
                <Link to="/albums" onClick={removeAlbum}><img src="/icons/arrow_left.svg" className="w-8 h-8 rounded-full hover:bg-gray-300"/></Link>
            </div>
        </div>
    )
}