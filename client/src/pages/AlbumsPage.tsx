import axios from "axios";
import { IAlbum } from "../models";
import { useAlbums } from "../hooks/albums";
import { Loader } from "../components/Loader";


export function AlbumsPage(){
    const { albums, error, loading, addAlbum } = useAlbums();

    let albumsCount = albums.length;

    return(
        <>
            { !loading && <div id="info-pannel" className="py-3 bg-slate-100">
                <p className="text-center italic">
                    <span id="albums-count">{ albumsCount }</span> альбомов
                </p>
            </div> }

            <main className="mx-auto px-0">
                <div className="flex bg-slate-700 flex-col pt-6">

                { loading && <Loader></Loader> }
                

                </div>
            </main>
        </>
    );
}