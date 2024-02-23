import { Route, Routes } from 'react-router-dom'
import { MediaPage } from './pages/MediaPage'
import { AlbumsPage } from './pages/AlbumsPage'
import { useContext } from 'react'
import { AlbumMediaPage } from './pages/AlbumMediaPage'
import {AlbumsRoutesContext} from "./context/AlbumsRoutesContext";


function App() {
    const { albums } = useContext(AlbumsRoutesContext)

    return (
        <Routes>
            <Route path="/" element={<MediaPage></MediaPage>}></Route>
            <Route path="/albums" element={<AlbumsPage></AlbumsPage>}></Route>
            { albums.map((album, i) => <Route path={"/albums/" + album.id} element={<AlbumMediaPage albumId={album.id} key={i}></AlbumMediaPage>} key={i}></Route>) }
        </Routes>
    )
}

export default App
