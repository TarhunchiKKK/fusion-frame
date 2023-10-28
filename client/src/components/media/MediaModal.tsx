import { useState } from "react";
import { useOneMedia } from "../../hooks/oneMedia";
import { EditKeywordsModal } from "./EditKeywordsModal";
import { useMediaModalFunctions } from "../../hooks/functions/mediaModalFunctions";
import { ChooseAlbumModal } from "./ChooseAlbumModal";

interface MediaModalProps{
    id: number
    close: () => void
}

export function MediaModal({ id, close }: MediaModalProps){
    let { media, error, loading } = useOneMedia(id)
    const { editKeywords, addToAlbum, removeMedia } = useMediaModalFunctions(media)

    const [editKeywordsModal, setEditKeywordsModal] = useState<boolean>(false)
    const [chooseAlbumModal, setChooseAlbumModal] = useState<boolean>(false)

    
    return(
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0" onClick={close}></div>
            <div className="flex flex-row justify-between w-[600px] h-[600px] mx-auto mt-2 mb-4  p-5 
                absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
                <div className="w-11/12 h-full border-black border-2">
                    <img className="w-full h-full " src={"/images/" + media.name} />
                </div>
                <div className="flex flex-col justify-start gap-4 w-1/12 h-full ml-7">
                    <img src="/icons/exit.svg" onClick={close} title="Закрыть" className="w-10 h-10 rounded-full hover:bg-gray-300"/>
                    <img src="/icons/basket.svg" onClick={removeMedia} title="Удалить" className="w-10 h-10 rounded-full hover:bg-gray-300"/>
                    <img src="/icons/add_to_album.svg" onClick={() => setChooseAlbumModal(true)} title="Добавить в альбом" className="w-10 h-10 rounded-full hover:bg-gray-300"/>
                    <img src="/icons/edit.svg" onClick={() => setEditKeywordsModal(true)} title="Изменить ключевые слова" className="w-10 h-10 rounded-full hover:bg-gray-300"/>
                </div>
                { editKeywordsModal && <EditKeywordsModal media={media} editKeywords={editKeywords} close={() => setEditKeywordsModal(false)} ></EditKeywordsModal> }
                { chooseAlbumModal && <ChooseAlbumModal media={media} close={() => setChooseAlbumModal(false)}></ChooseAlbumModal> }

            </div>
        </>
    );
}

