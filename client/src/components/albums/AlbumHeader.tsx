interface AlbumProps{
    name: string   
    exit: () => void
}

export function AlbumHeader({ name, exit }: AlbumProps){
    return(
        <div className="flex flex-row justify-between w-full h-8">
            <img src="/icons/arrow_left.svg" onClick={exit} className="w-8 h-8 rounded-full hover:bg-gray-300"/>
            <span className="font-bold">{ name }</span>
            <div>       </div>
        </div>
    )
}