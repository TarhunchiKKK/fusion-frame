export function Loader(){
    return(
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0"></div>
            <div className="absolute left-1/3 top-1/3 h-1/3 w-1/3 rounded-full">
                <img src="/icons/loading_bubles.svg" className="w-full h-full animate-spin"></img>
            </div>
        </>        
    )
}