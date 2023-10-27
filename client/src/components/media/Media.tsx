import { useContext, useState } from "react"
import { IMedia } from "../../models"
import { MediaModal } from "./MediaModal"
import { MediaModalContext } from "../../context/MediaModalContext"

interface MediaProps{
    media: IMedia
}

export function Media({media}: MediaProps){
    const [modal, setModal] = useState<boolean>(false)

    return(
        <div className="relative w-full sm:h-72 md:h-60 lg:h-52 xl:h-44">
            <img src = {"/images/" + media.name} alt="" className="w-full h-full"></img>
            <div className="w-6 h-6 rounded-full border-2 border-white absolute right-1 bottom-1"></div>

            {modal && <MediaModal id={media.id} close={() => setModal(false)} >
                
                </MediaModal>}
        </div>
    )
}