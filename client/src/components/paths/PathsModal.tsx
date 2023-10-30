import { useContext, useState } from "react"
import { ICreatePathDto, IPath } from "../../models"
import axios, { AxiosError } from "axios"
import { Path } from "./Path"
import { PathsModalContext, PathsModalState } from "../../context/PathsModalContext"
import { usePaths } from "../../hooks/paths"
import { Loader } from "../other/Loader"
import { ErrorMessage } from "../other/ErrorMesage"
import { PathService } from "../../services/path.service"
import { MediaService } from "../../services/media.service"

interface  PathModalProps{
    close: () => void
}



export function PathsModal({ close }: PathModalProps){
    const [err, setErr] = useState<string>('')
    const [path, setPath] = useState<string>('')
    const { paths, setPaths, error, loading } = usePaths()


    const [pathsCount, setPathsCount] = useState<number>(paths.length)

    console.log(paths)


    async function addPathHandler(event: React.FormEvent){
        event.preventDefault()
        try{
            if(path == ''){
                setErr('Выберите какой-нибудь каталог')
                return
            }
            setErr('')
            let newPath: IPath = await PathService.addPath(path)

            setPaths([...paths, newPath])
            await MediaService.loadMediaFromDirectory(path)
            setPath('')
            setPathsCount(pathsCount + 1)
        } catch(err: unknown){
            setErr((err as AxiosError).message)
        }    
    }

    async function chooseDirectoryHandler(){
        try{
            setErr('')
            let directory: string = await PathService.openExplorer()
            console.log('')
            if(directory === undefined || directory === ''){
                setPath('')
            }
            else{
                setPath(directory)
            }
            return directory
        } catch (err: unknown){
            setErr((err as AxiosError).message)
        }        
    }

    async function onRemovePath(path: IPath){
        await MediaService.removeDirectoryMedia(path.path)
        setPaths(paths.filter(p => p.id != path.id))
        setPathsCount(pathsCount - 1)
    }


    return (

        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0" onClick={close}></div>
            <div className="container w-[500]px mx-auto mt-2 mb-4 w-2/5 p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
                <div className="flex flex-row justify-between w-full">
                    <span className="font-bold ml-6">Отслеживаемые каталоги</span>
                    <img src="icons/exit.svg" onClick={close} className="w-8 h-8 mr-0 rounded-full hover:bg-gray-300"/>
                </div>

                { loading && <Loader></Loader> }
                { error && <ErrorMessage error={error}></ErrorMessage> }

                <div className="flex flex-col justify-around mx-auto border w-11/12 pb-2 mt-2 mb-3 bg-gray-200 rounded-lg">           
                        { paths.map(p => <Path path={p} onRemove={onRemovePath} key={p.id}></Path>) }
                </div>

                <div className="mx-auto w-11/12 mt-2 mb-2">
                    <form action="" onSubmit={addPathHandler}>
                        <input type="text" readOnly={true} value={path} placeholder="  Путь к каталогу" className="mx-auto w-full h-8 rounded-xl border-2 border-blue-700 active:border-blue-700"/>
                        <div className="flex flex-row mt-2">
                            <button onClick={() => chooseDirectoryHandler()} className="grow h-8 border-2 rounded-xl text-white bg-red-600 hover:bg-red-400">Проводник</button>
                            <button type="submit" className="grow h-8 border-2 rounded-xl text-white bg-red-600 hover:bg-red-400">Добавить</button>    
                        </div>
                    </form>
                </div>
            </div>
        </>   
    )
}



// export function PathsModal({ close }: PathModalProps){
//     const [err, setErr] = useState<string>('')
//     const [path, setPath] = useState<string>('')
//     const { paths, setPaths, error, loading } = usePaths()


//     const [pathsCount, setPathsCount] = useState<number>(paths.length)

//     console.log(paths)


//     async function addPathHandler(event: React.FormEvent){
//         event.preventDefault()
//         try{
//             if(path == ''){
//                 setErr('Выберите какой-нибудь каталог')
//                 return
//             }
//             setErr('')
//             let newPath: IPath = await PathService.addPath(path)

//             setPaths([...paths, newPath])
//             //await MediaService.loadMediaFromDirectory(path)
//             setPath('')
//             setPathsCount(pathsCount + 1)
//         } catch(err: unknown){
//             setErr((err as AxiosError).message)
//         }    
//     }

//     async function chooseDirectoryHandler(){
//         try{
//             setErr('')
//             let directory: string = await PathService.openExplorer()
//             console.log('')
//             if(directory === undefined || directory === ''){
//                 setPath('')
//             }
//             else{
//                 setPath(directory)
//             }
//             return directory
//         } catch (err: unknown){
//             setErr((err as AxiosError).message)
//         }        
//     }

//     function onRemovePath(id: number){
//         setPaths(paths.filter(p => p.id != id))
//         setPathsCount(pathsCount - 1)
//     }


//     return (

//         <>
//             <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0" onClick={close}></div>
//             <div className="container w-[500]px mx-auto mt-2 mb-4 w-2/5 p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
//                 <div className="flex flex-row justify-between w-full">
//                     <span className="font-bold ml-6">Отслеживаемые каталоги</span>
//                     <img src="icons/exit.svg" onClick={close} className="w-8 h-8 mr-0 rounded-full hover:bg-gray-300"/>
//                 </div>

//                 { loading && <Loader></Loader> }
//                 { error && <ErrorMessage error={error}></ErrorMessage> }

//                 {/* { pathsCount != 0 && 
//                     <div className="flex flex-col justify-around mx-auto border w-11/12 pb-2 mt-2 mb-3 bg-gray-200 rounded-lg">           
//                         { paths.map(p => <Path path={p} onRemove={onRemovePath} key={p.id}></Path>) }
//                     </div> } */}
//                     <div className="flex flex-col justify-around mx-auto border w-11/12 pb-2 mt-2 mb-3 bg-gray-200 rounded-lg">           
//                     { paths.map(p => <Path path={p} onRemove={onRemovePath} key={p.id}></Path>) }
//             </div>

//             <div className="mx-auto w-11/12 mt-2 mb-2">
//                 <form action="" onSubmit={addPathHandler}>
//                     <input type="text" readOnly={true} value={path} placeholder="  Путь к каталогу" className="mx-auto w-full h-8 rounded-xl border-2 border-blue-700 active:border-blue-700"/>
//                     <div className="flex flex-row mt-2">
//                         <button onClick={() => chooseDirectoryHandler()} className="grow h-8 border-2 rounded-xl text-white bg-red-600 hover:bg-red-400">Проводник</button>
//                         <button type="submit" className="grow h-8 border-2 rounded-xl text-white bg-red-600 hover:bg-red-400">Добавить</button>    
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </>   
// )
// }
