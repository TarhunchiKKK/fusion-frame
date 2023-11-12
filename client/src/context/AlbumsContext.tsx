import React, {createContext, useState} from "react";
import {Route} from "react-router-dom";
import {AlbumMedia} from "../components/albums/AlbumMedia";
import {IAlbum} from "../models";

interface IAlbumsContext{
    albums: IAlbum[]
    addAlbum: (album: IAlbum) => void
    removeAlbum: (album: IAlbum) => void
}

export const AlbumsContext = createContext<IAlbumsContext>({
    albums: [],
    addAlbum: (album: IAlbum) => {},
    removeAlbum: (album: IAlbum) => {}
})

export const AlbumsState = ({ children, allAlbums }: { children: React.ReactNode, allAlbums: IAlbum[] }) => {
    const [albums, setAlbums] = useState<IAlbum[]>(allAlbums)
    const addAlbum = (album: IAlbum) => {
        setAlbums([...albums, album])
    }

    const removeAlbum = (album: IAlbum) => {
        setAlbums(albums.filter(a => a.id != album.id))
    }

    return (
        <AlbumsContext.Provider value={{albums, addAlbum, removeAlbum}}>
            { children }
        </AlbumsContext.Provider>
    )
}