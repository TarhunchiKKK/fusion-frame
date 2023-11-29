import { useContext, useState } from "react"
import { IMedia, getDefaultMedia } from "../models"
import { AlbumService } from "../services/album.service"
import { ErrorMessage } from "../components/other/ErrorMesage"
import { Loader } from "../components/other/Loader"
import { MediaGroup } from "../components/media/MediaGroup"
import { Header } from "../components/other/Header"
import { splitMediaByDate } from "../hooks/media"
import { MediaModal } from "../components/media/MediaModal"
import { AlbumHeader } from "../components/albums/AlbumHeader"
import { useAlbum } from "../hooks/album";
import { AlbumsRoutesContext } from "../context/AlbumsRoutesContext";
import { EditAlbumModal } from "../components/albums/EditAlbumModal";

interface AlbumMediaProps{
    albumId: number
}

export function AlbumMediaPage({ albumId }: AlbumMediaProps){
    const [currentMedia, setCurrentMedia] = useState<IMedia>(getDefaultMedia())

    const { album, error, loading, fetchAlbum } = useAlbum(albumId)
    let mediaByDate: IMedia[][] = splitMediaByDate(album.media)

    const [mediaModal, setMediaModal] = useState<boolean>(false)
    const [editAlbumModal, setEditAlbumModal] = useState<boolean>(false)

    const { removeAlbumRoute } = useContext(AlbumsRoutesContext)
    const removeAlbumHandler = async () => {
        try{
            await AlbumService.remove(album.id)
            removeAlbumRoute(album)
        } catch(e: unknown){

        }
    }

    return (
        <>
            { error && <ErrorMessage error={error}></ErrorMessage> }

            <Header haveIcons={false} openSearchModal={() => {}} openPathsModal={() =>{}}></Header>
            
            <AlbumHeader title={album.name} editAlbum={() => setEditAlbumModal(true)} removeAlbum={() => removeAlbumHandler()}></AlbumHeader>

            { loading && <Loader></Loader> }

            <main className="mx-auto px-0">
                <div className="flex bg-indigo-600 flex-col pt-6">
                    { mediaByDate.map(m => <MediaGroup media={m} creationDate={new Date(m[0].creationDate)} openMediaModal={() => setMediaModal(true)} setCurrentMedia={setCurrentMedia} key={m[0].id}></MediaGroup>) }
                </div>

                { mediaByDate.length === 0 && <p className="mx-auto text-2xl"></p> }

                { mediaModal && <MediaModal id={currentMedia.id} close={() => {setMediaModal(false); fetchAlbum();}}></MediaModal>}

                { editAlbumModal && <EditAlbumModal album={album} close={() => { setEditAlbumModal(false); fetchAlbum()}}></EditAlbumModal> }
            </main>
        </>
    )
}