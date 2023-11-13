import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {AlbumsState} from "./context/AlbumsRoutesContext";
import {IAlbum} from "./models";
import {AlbumService} from "./services/album.service";
import { MediaService } from './services/media.service';
import { PathService } from './services/path.service';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

async function uploadMedia(){
    let latestDate: Date = await MediaService.getLatestDate();
    let directoriesWithNewFiles: string[] = await PathService.checkForNewFiles(latestDate);
    await MediaService.updateMediaFromDirectories(directoriesWithNewFiles, latestDate)
}
await uploadMedia()

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AlbumsState>
        <App />
      </AlbumsState>
    </React.StrictMode>
  </BrowserRouter>
  
);

