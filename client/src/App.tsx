import {Route, Routes, useRoutes} from 'react-router-dom'
import { MediaPage } from './pages/MediaPage'
import { AlbumsPage } from './pages/AlbumsPage'
import {useContext, useEffect, useState} from 'react'
import { AlbumService } from './services/album.service'
import { AlbumMediaPage } from './pages/AlbumMediaPage'
import { IAlbum } from './models'
import {AlbumsRoutesContext} from "./context/AlbumsRoutesContext";
import { MediaService } from './services/media.service'
import { PathService } from './services/path.service'



function App() {

    

    const { albums, addAlbumRoute, removeAlbumRoute } = useContext(AlbumsRoutesContext)

    return (
        <Routes>
            <Route path="/" element={<MediaPage></MediaPage>}></Route>
            <Route path="/albums" element={<AlbumsPage></AlbumsPage>}></Route>
            { albums.map((album, i) => <Route path={"/albums/" + album.id} element={<AlbumMediaPage albumId={album.id} key={i}></AlbumMediaPage>} key={i}></Route>) }
        </Routes>
    )
}

export default App
