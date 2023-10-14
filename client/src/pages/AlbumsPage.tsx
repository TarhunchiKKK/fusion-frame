import axios from "axios"
import { IAlbum } from "../models"
import { useAlbums } from "../hooks/albums"
import { Loader } from "../components/other/Loader"
import { ErrorMessage } from "../components/other/ErrorMesage"


export function AlbumsPage(){
    const { albums, error, loading } = useAlbums()

    let albumsCount = albums.length

    return(
        <>
            { error && <ErrorMessage error={error}></ErrorMessage> }
            
            { !loading && <div id="info-pannel" className="py-3 bg-slate-100">
                <p className="text-center italic">
                    <span id="albums-count">{ albumsCount }</span> альбомов
                </p>
            </div> }

            <div className="fixed left-1/2 bottom-4 rounded-full w-3 h-3 bg-red-500">
                <img className="w-100 h-100" src="../icons/plus.svg" alt="" />
            </div>

            <main className="mx-auto px-0">
                <div className="flex bg-slate-700 flex-col pt-6">

                { loading && <Loader></Loader> }
                

                </div>
            </main>
        </>
    )
}