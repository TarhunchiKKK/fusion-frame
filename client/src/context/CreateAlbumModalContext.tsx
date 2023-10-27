import { createContext, useState } from "react"
import { AlbumService } from "../services/album.service"

interface ICreateAlbumModalContxt{
    modal: boolean
    open: () => void
    create: (albumName: string) => Promise<void>
    close: () => void
}

export const CreateAlbumModalContext = createContext<ICreateAlbumModalContxt>({
    modal: false,
    open: () => {},
    create: async (albumName: string) => {  },
    close: () => {}
})

export const CreateAlbumModalState = ({ children }: {children: React.ReactNode}) => {
    const [modal, setModal] = useState<boolean>(false)
    const open = () => setModal(true)
    const close = () => setModal(false)
    const create = async (albumName: string) => {
        close()
        const createdAlbum = await AlbumService.create(albumName)
        // нужно обновить список альбомов
    }
    return(
        <CreateAlbumModalContext.Provider value={ { modal, open, create, close } }>
            { children }
        </CreateAlbumModalContext.Provider>
    )
}