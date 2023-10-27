import React, { createContext, useState } from "react"
import { PathService } from "../services/path.service"
import { AxiosError } from "axios"

interface IPathsModalContext{
    modal:boolean
    open: () => void
    close: () => void
    addPath: (path: string) => Promise<void>
    chooseDirectory: () => Promise<string | undefined>
    openInExplorer: (path: string) => Promise<void>
    removePath: (id: number) => Promise<void>
}

export const PathsModalContext = createContext<IPathsModalContext>({
    modal: false,
    open: () => {},
    close: () => {},
    addPath: async (path: string) => {},
    chooseDirectory: async () => {return '' },
    openInExplorer: async (path: string) => {},
    removePath: async (id: number) => {}
})

export const PathsModalState = ({ children }: { children: React.ReactNode } ) => {
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const [modal, setModal] = useState<boolean>(false)
    const open = () => setModal(true)
    const close = () => setModal(false)
    const addPath = async (path: string) => {
        try{
            setError('')
            await PathService.addPath(path)
        } catch(error: unknown){
            setError((error as AxiosError).message)
        }
    }
    const chooseDirectory = async () => {
        try{
            setError('')
            let directory: string = await PathService.openExplorer()
            if (directory === undefined){
                return ''
            }
            return directory
        } catch (error: unknown){
            setError((error as AxiosError).message)
        }
    }

    const openInExplorer = async (path: string) => {
        try{
            setError('')
            await PathService.openDirectoryInExplorer(path)
        } catch(error: unknown){
            setError((error as AxiosError).message)
        }
    }

    const removePath = async (id: number) => {
        try{
            setError('')
            await PathService.removePath(id)
        } catch(error: unknown){
            setError((error as AxiosError).message)
        }
    }

    return(
        <PathsModalContext.Provider value={{ modal, open, close, addPath, chooseDirectory, openInExplorer, removePath }}>
            { children }
        </PathsModalContext.Provider>
    )
}