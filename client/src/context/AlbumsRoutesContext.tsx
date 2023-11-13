import React, {createContext, useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {AlbumMediaPage} from "../pages/AlbumMediaPage";
import {IAlbum} from "../models";
import {AlbumService} from "../services/album.service";

interface IAlbumsRoutesContext{
    albums: IAlbum[]
    addAlbumRoute: (album: IAlbum) => void
    removeAlbumRoute: (album: IAlbum) => void
}

export const AlbumsRoutesContext = createContext<IAlbumsRoutesContext>({
    albums: [],
    addAlbumRoute: (album: IAlbum) => {},
    removeAlbumRoute: (album: IAlbum) => {}
})

export const AlbumsState = ({ children }: { children: React.ReactNode }) => {
    const [albums, setAlbums] = useState<IAlbum[]>([])
    const addAlbumRoute = (album: IAlbum) => {
        setAlbums([...albums, album].sort((a, b) => a.name > b.name ? 1 : -1))
    }

    const removeAlbumRoute = (album: IAlbum) => {
        setAlbums(albums.filter(a => a.id != album.id))
    }


    async function fetchAlbums () {
        try{
            const data: IAlbum[] = await AlbumService.getAll()
            setAlbums(data)
        } catch(error){
            console.log("Error with fetching data in AlbumsRoutesContext")
        }
    }

    useEffect(() => {
        fetchAlbums()
    }, [])

    return (
        <AlbumsRoutesContext.Provider value={{albums, addAlbumRoute, removeAlbumRoute}}>
            { children }
        </AlbumsRoutesContext.Provider>
    )
}