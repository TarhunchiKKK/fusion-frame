import axios from 'axios';
import React from 'react';
import { IAlbum, IMedia } from './models';
import { MediaGroup } from './components/MediaGroup';
import { Header } from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { MediaPage } from './pages/MediaPage';
import { AlbumsPage } from './pages/AlbumsPage';

function App() { 
  
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<MediaPage></MediaPage>}></Route>
        <Route path="/albums" element={<AlbumsPage></AlbumsPage>}></Route>
      </Routes>
    </>
  );
}

export default App;
