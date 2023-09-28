import { createContext, useState } from "react";

interface ICreateAlbumModalContext{
    modal: boolean;
    open: () => void;
    close: () => void;
}

export const CreateAlbumModalContext = createContext<ICreateAlbumModalContext>({
    modal: false,
    open: () => {},
    close: () => {}
});

export const CreateAlbumModalState = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState(false);
    const open = () => setModal(true);
    const close = () => setModal(false);

    return(
        <CreateAlbumModalContext.Provider value={({ modal, open, close })}>
            { children }
        </CreateAlbumModalContext.Provider>
    );
}