import { MediaGroup } from "../components/media/MediaGroup"
import { IMedia, getDefaultMedia } from "../models"
import { useMedia } from "../hooks/media"
import { Loader } from "../components/other/Loader"
import { ErrorMessage } from "../components/other/ErrorMesage"
import { Header } from "../components/other/Header"
import { useState } from "react"
import { MediaModal } from "../components/media/MediaModal"
import { SearchModal } from "../components/other/SearchModal"
import { PathsModal } from "../components/paths/PathsModal"




export  function MediaPage(){
    const [keywordsToSearch, setKeywordsToSearch] = useState<string[]>([])
    const [currentMedia, setCurrentMedia] = useState<IMedia>(getDefaultMedia())

    const [mediaModal, setMediaModal] = useState<boolean>(false)
    const [searchModal, setSearchModal] = useState<boolean>(false)
    const [pathsModal, setPathsModal] = useState<boolean>(false)

    const setValueToSearch = (value: string) => {
        let keywords: string[]  = []
        if(value !== '') {
            keywords = value.split(';')
            for(let i = 0; i < keywords.length; i++){
                keywords[i] = keywords[i].trim()
            }
        }
        
        setKeywordsToSearch(keywords)
        fetchMedia(keywords)
    }

    const { mediaByDate, error, loading, fetchMedia  } = useMedia(keywordsToSearch)
   
   
    return(
        <>
            { error && <ErrorMessage error={error}></ErrorMessage> }

            <Header haveIcons={true} openSearchModal={() => setSearchModal(true)} openPathsModal={() => setPathsModal(true)}></Header>

            { loading && <Loader></Loader> }

            <main className="mx-auto px-0">
                <div className="flex bg-indigo-600 flex-col pt-6">
                    { mediaByDate.map(m => <MediaGroup media={m} creationDate={new Date(m[0].creationDate)} openMediaModal={() => setMediaModal(true)} setCurrentMedia={setCurrentMedia} key={m[0].id}></MediaGroup>) }
                </div>

                { mediaByDate.length === 0 && <p className="mx-auto text-2xl"></p> }

                { mediaModal && <MediaModal id={currentMedia.id} close={() => { setMediaModal(false); setValueToSearch(keywordsToSearch.join(';'));} }></MediaModal>}

                { searchModal &&  <SearchModal searchedObjects={"Media"} setValueToSearch={setValueToSearch} close={() => setSearchModal(false)}></SearchModal>}

                { pathsModal && <PathsModal close={() => { setPathsModal(false); setValueToSearch(keywordsToSearch.join(';'));} }></PathsModal> }

            </main>
            
            { keywordsToSearch.length !== 0 && <img src="/icons/arrow_left.svg" alt="Назад" className="fixed top-5 left-[70px] p-1 w-10 h-10 bg-red-400 hover:bg-red-500 rounded-full" onClick={() => setValueToSearch('')}></img> }
        </>  
    )
}