// Entities

export interface IMedia{
    id?: number
    path: string
    size: number
    creationDate: Date
    keywords: string[]
    duration: number | undefined
}

export interface IAlbum{
    id?: number
    name: string
    mediaCount: number
    size: number
    media: IMedia[]
}

export interface IMediaGroup{
    media: IMedia[]
    creationDate: Date
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

export interface ISearchAlbumDto{
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

export interface IAddManyMediaDto{
    id: number
    media: IMedia[]
}





export interface IKeywordsDto{
    keywords: string[]
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