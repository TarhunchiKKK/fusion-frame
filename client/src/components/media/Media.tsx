import { IMedia } from "../../models"

interface MediaProps{
    media: IMedia
    openMediaModal: () => void
    setCurrentMedia: (currentMedia: IMedia) => void
}

export function Media({media, openMediaModal, setCurrentMedia}: MediaProps){
    return(
        <div className="relative w-full sm:h-72 md:h-60 lg:h-52 xl:h-44">
            <img src = {"/storage/" + media.name} alt={media.name} onClick={() => { setCurrentMedia(media); openMediaModal(); }} className="w-full h-full"></img>
        </div>
    )
}