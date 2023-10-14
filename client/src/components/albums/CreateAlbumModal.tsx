interface CreateAlbumModalProps{
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}

export function CreateAlbumModal({ children, title, onClose }: CreateAlbumModalProps){
    return(
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0" onClick={onClose}></div>
            <div className="w-2/5 p-5 rounded bg-white absolute top-10 left-1/2 -translate-x-1/2">
            <h1 className="text-2lg text-center mb-2">{ title }</h1>
                { children }
            </div>
        </>
    );
}