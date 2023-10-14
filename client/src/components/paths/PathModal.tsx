import { useState } from "react"
import { ICreatePathDto, IPath } from "../../models"
import axios, { AxiosError } from "axios"
import { Path } from "./Path"

function replaceSymbol(str: string, old_symbol: string, new_symbol: string) {
    let new_str: string = ""
    for(let c of str){
        if(c == old_symbol) new_str += new_symbol
        else new_str += c
    }
    return new_str
}

interface PathModalProps{
    paths: IPath[]
    children: React.ReactNode
    onSubmit: () => void
    onAdd: () => void
    onClose: () => void
}

const pathData: ICreatePathDto = {
    path: '',
}

export function PathModal({ children, paths, onClose }: PathModalProps){
    const [plus, setPlus] = useState(false)
    const [path, setPath] = useState('')
    const [error, setError] = useState('')

    function onPlusClick(){
        setPlus(true)
    }

    function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>){
        setPath(event.target.value)
    }

    async function onAddPath(){
        try{
            setError('')
            if(path.trim().length == 0){
                setError('Enter valid path')
                return
            }
           
            pathData.path =  replaceSymbol(path, '\\', '/')
            const response = await axios.post<IPath>('localhost:3000/paths/add', pathData)
            setPlus(false)
        } catch(e: unknown){
            setError((e as AxiosError).message)
        }
        
    }

    return (
        <>
            <div className="fixed bg-black/50 top-0 left-0 right-0 bottom-0" onClick={onClose}></div>
            <div className="container rounded-3xl bg-white w-3/5">
                {/*  */}
                <div className="flex flex-row justify-end pt-6 pb-4 w-4/5">
                    <div className="rounded-full h-4 w-4">
                        <img src="../icons/plus.svg" alt="" onClick={onPlusClick} />
                    </div>
                    <div className="rounded-full h-4 w-4">
                        <img src="../icons/plus.svg" alt="" />
                    </div>
                </div>       

                {/* прямоугольный контейнер с путями */}
                <div className="container flex flex-col justify-start bg-slate-500 w-4/5">
                    { paths.map((p) => <Path path={p} key={p.id}></Path>)}

                    {/* поле ввода пути и кнопка появляются когда был нажат плюс*/}
                    { plus && <div className="container w-4/5">
                        <form className="flex flex-row" action="" onSubmit={onAddPath}>
                            <input type="text" placeholder="Paste path here..." onChange={onChangeHandler} value={path}/>
                            <button type="submit" className="rounded-3xl p-2 bg-red-400" ></button>
                        </form>
                    </div> }
                </div>

            </div>
        </>   
    )
}