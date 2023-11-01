import axios from "axios"
import { IAlbum, ISearchValue, getDefaultAlbum } from "../models"
import { useAlbums } from "../hooks/albums"
import { Loader } from "../components/other/Loader"
import { ErrorMessage } from "../components/other/ErrorMesage"
import { Header } from "../components/other/Header"
import { useState } from "react"
import { PathsModal } from "../components/paths/PathsModal"
import { SearchModal } from "../components/other/SearchModal"
import { Album } from "../components/albums/Album"

function SetSearchValueClosure(searchValue: ISearchValue){
    const inner = (value: string) =>{
        searchValue.value = value
    }
    return inner
}


export function AlbumsPage(){
    const [albumNameToSearch, setAlbumNameToSearch] = useState<string>('')
    const [currentAlbum, setCurrentAlbum] = useState<IAlbum>(getDefaultAlbum())
    const [albumModal, setAlbumModal] = useState<boolean>(false)
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [pathsModal, setPathsModal] = useState<boolean>(false)


    const setValueToSearch = (albumName: string) => {
        setAlbumNameToSearch(albumName)
        fetchAlbums(albumName)
    }
    
    const { albums, error, loading, fetchAlbums } = useAlbums(albumNameToSearch)


    return(
        <>
            { error && <ErrorMessage error={error}></ErrorMessage> }

            <Header haveIcons={true} openSearchModal={() => setSearchModal(true)} openPathsModal={() => setPathsModal(true)}></Header>

            { loading && <Loader></Loader> }

            <div className="fixed left-1/2 bottom-4 rounded-full w-3 h-3 bg-red-500">
                <img className="w-100 h-100" src="../icons/plus.svg" alt="" />
            </div>

            <main className="mx-auto px-0 bg-indigo-600">
                { albumNameToSearch != '' && <div className="fixed top-15 left-15 w-10 h-10 bg-red-400 rounded-full" onClick={() => setAlbumNameToSearch('')}></div> }

                <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0">
                    { albums.map(a => <Album album={a}></Album>) }
                </div>

                {/* { albumModal && <AlbumModal></AlbumModal> } */}

                { searchModal &&  <SearchModal searchedObjects={"Media"} setValueToSearch={setAlbumNameToSearch} close={() => setSearchModal(false)}></SearchModal>}
                { pathsModal && <PathsModal close={() => setPathsModal(false)}></PathsModal> }
            </main>

            { albumNameToSearch != '' && <img src="/icons/arrow_left.svg" title="Назад" className="fixed top-5 left-[70px] p-1 w-10 h-10 bg-red-400 hover:bg-red-500 rounded-full" onClick={() => setValueToSearch('')}></img> }
        </>
    )
}