import React, { useState } from "react"
import { IMedia } from "../../models"

interface EditKeywordsModalProps {
    close:  () => void
    media: IMedia
    
    editKeywords: (keywords: string[]) => Promise<void>
}

export function EditKeywordsModal({ close, media, editKeywords }: EditKeywordsModalProps){

    const [value, setValue] = useState<string>('')

    const submitHandler = async (event:React.FormEvent) => {
        event.preventDefault()
        let newKeywords: string[] = value.split(';')
        for(let i = 0; i < newKeywords.length; i++) {
            newKeywords[i].trim()
        }
        await editKeywords(newKeywords)
        close()
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return(
        <>
            <div onClick={close} className="fixed bg-black/50 top-0 left-0 right-0 bottom-0"></div>
            <div className="flex flex-col justify-between w-2/5  mx-auto mt-2 mb-4 p-5 
                absolute top-1/3 left-1/2 -translate-x-1/2 rounded-xl bg-white">
                <div className="flex flex-row justify-end w-full">
                    <span className="font-bold ml-6">Ключевые слова</span>
                    <img src="/icons/exit.svg" onClick={close} className="w-8 h-8 rounded-full hover:bg-gray-300" />
                </div>
                <div className="mx-auto w-11/12 mb-2">
                    <span>{media.keywords.join('; ')}</span>
                </div>
                <div className="mx-auto w-11/12 mb-2">
                    <form action="" onSubmit={submitHandler}>
                        <input type="text"  onChange={changeHandler} className="border rounded-xl w-full h-10 outline-0" placeholder="Ключевые слова через ';'" />
                    </form>
                </div>
            </div>
        </>
    )
}