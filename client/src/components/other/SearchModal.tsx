import React, { useState } from "react"
import { ErrorMessage } from "./ErrorMesage"

interface SearchModalProps {
    searchedObjects: "Albums" | "Media"
    setValueToSearch: (value: string) => void 
    close: () => void
}


export function SearchModal({  searchedObjects, setValueToSearch, close }: SearchModalProps){
    const [error, setError] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const placeholder: string = searchedObjects == 'Media' ? "  Ключевые сова через ';'" : "  Название альбома"

    function submitHandler(event: React.FormEvent){
        setValueToSearch(value)
        close()
    }

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>){
        setValue(event.target.value)
    }

    return(
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0" onClick={close}></div>
            <div className="container w-[500]px mx-auto mt-2 mb-4 w-2/5 p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white">
                <div className="flex flex-row justify-between w-full">
                    <span className="font-bold ml-6">Поиск</span>
                    <img src="/icons/exit.svg" title="Закрыть" onClick={close} className="w-8 h-8 mr-2 rounded-full hover:bg-gray-300"/>
                </div>
                    
                <div className="mx-auto w-11/12 mt-2">
                    <form action="" onSubmit={submitHandler}>
                        <input type="text" onChange={changeHandler} placeholder={placeholder} className="mx-auto w-full h-8 rounded-xl border-2 border-blue-700 active:border-blue-700"/>
                        { error && <ErrorMessage error={error}></ErrorMessage> }
                        <div className="flex flex-row justify-center mt-2">
                            <button type="submit"  onClick={submitHandler} className="w-1/2 h-8 border-2 rounded-xl text-white bg-red-600 hover:bg-red-400">Найти</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}