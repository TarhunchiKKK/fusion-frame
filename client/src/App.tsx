import { Route, Routes } from 'react-router-dom'
import { MediaPage } from './pages/MediaPage'
import { AlbumsPage } from './pages/AlbumsPage'
import { useState } from 'react'
import { AlbumService } from './services/album.service'
import { AlbumMedia } from './components/albums/AlbumMedia'
import { IAlbum } from './models'

function App() { 
    const [albums, setAlbums] = useState<IAlbum[]>([])

    const getAlbums = async () => {
        try{
            let data: IAlbum[] = await AlbumService.getAll()
            setAlbums(data)
        } catch(error){

        }
    }
    getAlbums()


    return (
        <Routes>
            <Route path="/" element={<MediaPage></MediaPage>}></Route>
            <Route path="/albums" element={<AlbumsPage></AlbumsPage>}></Route>
            { albums.map((album, i) => <Route path={"/albums/" + album.name} element={<AlbumMedia albumId={album.id} key={i}></AlbumMedia>}></Route>) }
        </Routes> 
    )
}

export default App
