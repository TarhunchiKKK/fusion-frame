import { Header } from './components/other/Header'
import { Route, Routes } from 'react-router-dom'
import { MediaPage } from './pages/MediaPage'
import { AlbumsPage } from './pages/AlbumsPage'

function App() { 
  
  return (
    <Routes>
        <Route path="/" element={<MediaPage></MediaPage>}></Route>
        <Route path="/albums" element={<AlbumsPage></AlbumsPage>}></Route>
    </Routes> 
  )
}

export default App
