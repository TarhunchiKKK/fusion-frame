export function Loader(){
    return(
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0"></div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-1/4 w-1/4 rounded-full">
                <img src="/icons/loader.svg" alt="Загрузка" className="w-full h-full animate-spin"></img>
            </div>
        </>        
    )
}