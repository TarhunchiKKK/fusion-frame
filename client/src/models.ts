// Entities

export interface IMedia{
    id: number
    name: string
    path: string
    size: number
    creationDate: string
    keywords: string[]
    duration: number | undefined
    albums: IAlbum[]
}

export function getDefaultMedia(): IMedia{
    return {
        id: -1,
        name: '',
        path: '',
        size: 0,
        creationDate: '',
        keywords: [],
        duration: undefined,
        albums: []
    }
}


export interface IAlbum{
    id: number
    name: string
    mediaCount: number
    size: number
    media: IMedia[]
}

export function getDefaultAlbum(): IAlbum{
    return {
        id: -1,
        name: '',
        mediaCount: 0,
        size: 0,
        media: []
    }
}

export interface IPath{
    id: number
    path: string
}

/*--------------------------------------------------*/
// DTO

export interface ICreateAlbumDto{
    name: string
}

export interface IUpdateAlbumDto{
    id: number
    name: string
}

export interface IAddOneMediaDto{
    id: number
    media: IMedia
}

export interface ILoadMediaDto{
    path: string
}

export interface IRemoveMediasDto{
    ids: number[]
}

export interface IUpdateKeywordsDto{
    id: number
    keywords: string[]
}

export interface IUploadMediaDto{
    paths: string[]
    latestDate: Date
}

export interface ICreatePathDto{
    path: string
}

export interface IDirectoryDto{
    path: string
}

export interface IDateDto{
    creationDate: string;
}

