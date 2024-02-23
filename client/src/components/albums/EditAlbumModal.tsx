import { useState } from "react"
import { IAlbum } from "../../models"
import { ErrorMessage } from "../other/ErrorMesage"
import { AlbumService } from "../../services/album.service";
import { AxiosError } from "axios";

interface CreateAlbumModalProps{
    album: IAlbum
    close: () => void
}

export function EditAlbumModal({ album, close }: CreateAlbumModalProps ){
    const [albumName, setAlbumName] = useState('')
    const [error, setError] = useState('')


    async function submitHandler(event: React.FormEvent){
        event.preventDefault()
        let value: string = albumName.trim()
        if(value.length === 0){
            setError('Enter valid album name')
            return
        }
        else if(value.includes(':') || value.includes('/') || value.includes(';') || value.includes(',') || value.includes('.')){
            setError('Album name cannot contains some symbols')
            return
        }

        try{
            await AlbumService.updateAlbumName(album.id, value)
        } catch(e: unknown){
            setError((e as AxiosError).message)
        }

        close()
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>){
        setAlbumName(event.target.value)
    }

    return(
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0"></div>
            <div className="container w-[500]px mx-auto mt-2 mb-4 w-2/5 p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
                <div className="flex flex-row justify-between w-full">
                    <span className="font-bold ml-6">Создание альбома</span>
                    <img src="/icons/exit.svg" alt="Закрыть" onClick={close} className="w-8 h-8 mr-2 rounded-full hover:bg-gray-300"/>
                </div>

                <div className="mx-auto w-11/12 mt-2">
                    <form action="" onSubmit={submitHandler}>
                        <input type="text" onChange={changeHandler} placeholder="  Название альбома" className="mx-auto w-full h-8 rounded-xl border-2 border-blue-700 active:border-blue-700"/>
                        { error && <ErrorMessage error={error}></ErrorMessage> }
                        <div className="flex flex-row justify-center mt-2">
                            <button type="submit" className="w-1/2 h-8 border-2 rounded-xl text-white bg-red-600 hover:bg-red-400">Изменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}