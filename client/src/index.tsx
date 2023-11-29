import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom';
import {AlbumsState} from "./context/AlbumsRoutesContext";
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
  <HashRouter>
    <React.StrictMode>
      <AlbumsState>
        <App />
      </AlbumsState>
    </React.StrictMode>
    </HashRouter>  
);

