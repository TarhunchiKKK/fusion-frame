import { useState } from "react"
import { IAlbum, IMedia, getDefaultAlbum, getDefaultMedia } from "../../models"
import { AlbumService } from "../../services/album.service"
import { AxiosError } from "axios"
import { ErrorMessage } from "../other/ErrorMesage"
import { Loader } from "../other/Loader"
import { MediaGroup } from "../media/MediaGroup"
import { Header } from "../other/Header"
import { splitMediaByDate } from "../../hooks/media"
import { MediaModal } from "../media/MediaModal"
import { SearchModal } from "../other/SearchModal"
import { PathsModal } from "../paths/PathsModal"
import { AlbumHeader } from "./AlbumHeader"

interface AlbumMediaProps{
    albumId: number
}

export function AlbumMedia({ albumId }: AlbumMediaProps){
    const [currentMedia, setCurrentMedia] = useState<IMedia>(getDefaultMedia())

    const [mediaModal, setMediaModal] = useState<boolean>(false)
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [pathsModal, setPathsModal] = useState<boolean>(false)

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    let album: IAlbum = getDefaultAlbum()
    const fetchAlbum = async () => {
        try{
            setError('')
            setLoading(true)
            let fetchedAlbum = await AlbumService.getOne(albumId)
            album = fetchedAlbum
            setLoading(false)
        } catch(error: unknown){
            setError((error as AxiosError).message)
        }
    }
    fetchAlbum()


    let mediaByDate: IMedia[][] = splitMediaByDate(album.media)

    return (
        <>
            { error && <ErrorMessage error={error}></ErrorMessage> }

            <Header haveIcons={false} openSearchModal={() => {}} openPathsModal={() =>{}}></Header>
            
            <AlbumHeader name={album.name} exit={() => {}}></AlbumHeader>

            { loading && <Loader></Loader> }

            <main className="mx-auto px-0">
                <div className="flex bg-indigo-600 flex-col pt-6">
                    { mediaByDate.map(m => <MediaGroup media={m} creationDate={new Date(m[0].creationDate)} openMediaModal={() => setMediaModal(true)} setCurrentMedia={setCurrentMedia} key={m[0].id}></MediaGroup>) }
                </div>

                { mediaModal && <MediaModal id={currentMedia.id} close={() => setMediaModal(false)}></MediaModal>}


                {/* { searchModal &&  <SearchModal searchedObjects={"Media"} setValueToSearch={setValueToSearch} close={() => setSearchModal(false)}></SearchModal>} */}
                {/* { pathsModal && <PathsModal close={() => { setPathsModal(false); setValueToSearch('');} }></PathsModal> } */}

            </main>
            {/* { keywordsToSearch.length != 0 && <img src="/icons/arrow_left.svg" title="Назад" className="fixed top-5 left-[70px] p-1 w-10 h-10 bg-red-400 hover:bg-red-500 rounded-full" onClick={() => setValueToSearch('')}></img> } */}
        </>  
    )
}