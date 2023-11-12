import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {AlbumsState} from "./context/AlbumsRoutesContext";
import {IAlbum} from "./models";
import {AlbumService} from "./services/album.service";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AlbumsState>
        <App />
      </AlbumsState>
    </React.StrictMode>
  </BrowserRouter>
  
);

