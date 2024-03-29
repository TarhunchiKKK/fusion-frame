import { useAlbums } from "../hooks/albums"
import { Loader } from "../components/other/Loader"
import { Header } from "../components/other/Header"
import { useState} from "react"
import { PathsModal } from "../components/paths/PathsModal"
import { SearchModal } from "../components/other/SearchModal"
import { Album } from "../components/albums/Album"
import {CreateAlbumModal} from "../components/albums/CreateAlbumModal";

export function AlbumsPage(){
    const [albumNameToSearch, setAlbumNameToSearch] = useState<string>('')

    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [pathsModal, setPathsModal] = useState<boolean>(false)
    const [createAlbumModal, setCreateAlbumModal] = useState<boolean>()

    const setValueToSearch = (albumName: string) => {
        setAlbumNameToSearch(albumName)
        fetchAlbums(albumName)
    }
    
    const { albums, loading, fetchAlbums } = useAlbums(albumNameToSearch)


    return(
        <>
            <Header haveIcons={true} openSearchModal={() => setSearchModal(true)} openPathsModal={() => setPathsModal(true)}></Header>

            { loading && <Loader></Loader> }

            <div className="fixed left-1/2 bottom-4 rounded-full w-10 h-10 bg-red-500">
                <img className="w-100 h-100" onClick={() => setCreateAlbumModal(true)} src="../icons/plus.svg" alt="Создать альбом"/>
            </div>

            <main className="mx-auto px-0 bg-indigo-600">

                { albums.length === 0 && <p className="mx-auto text-2xl">Альбомов нет</p>}

                <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0">
                    { albums.map(a => <Album album={a}></Album>) }
                </div>

                { searchModal &&  <SearchModal searchedObjects={"Albums"} setValueToSearch={setValueToSearch} close={() => setSearchModal(false)}></SearchModal>}

                { pathsModal && <PathsModal close={() => setPathsModal(false)}></PathsModal> }

                { createAlbumModal && <CreateAlbumModal onCreate={() => fetchAlbums(albumNameToSearch)} close={() => setCreateAlbumModal(false)}></CreateAlbumModal> }
            </main>

            { albumNameToSearch !== '' && <img src="/icons/arrow_left.svg" alt="Назад" className="fixed top-5 left-[70px] p-1 w-15 h-10 bg-red-400 hover:bg-red-500 rounded-full" onClick={() => setValueToSearch('')}></img> }
        </>
    )
}