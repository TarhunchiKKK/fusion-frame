import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {AlbumsState} from "./context/AlbumsContext";
import {IAlbum} from "./models";
import {AlbumService} from "./services/album.service";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let albums: IAlbum[ ] = []

const getAlbums = async () => {
    try{
        albums = await AlbumService.getAll()
    } catch(error){

    }
}
getAlbums()

root.render(
  <BrowserRouter>
    {/*<React.StrictMode>*/}
      <AlbumsState allAlbums={albums}>
        <App />
      </AlbumsState>
    {/*</React.StrictMode>*/}
  </BrowserRouter>
  
);

