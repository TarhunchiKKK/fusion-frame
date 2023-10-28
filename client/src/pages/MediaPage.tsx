import axios from "axios"
import { MediaGroup } from "../components/media/MediaGroup"
import { IMedia, ISearchValue } from "../models"
import { useMedia } from "../hooks/media"
import { Loader } from "../components/other/Loader"
import { ErrorMessage } from "../components/other/ErrorMesage"
import { Header } from "../components/other/Header"


function trimMediaDates(media: IMedia[]): IMedia[] {
    for (let m of media){
        m.creationDate = m.creationDate.substring(0, 10)
        m.path = '../src/images/Picture1.jfif'
    }
    return media
}


function splitMediaByDate(media: IMedia[]): IMedia[][]{    
    media = trimMediaDates(media)


    let dates: string[] = []
    for(let m of media){
        if (!dates.includes(m.creationDate)){
            dates.push(m.creationDate)
        }
    }
   
    // массив медиа, разбитый по времени создания
    let splitedMedia: IMedia[][] = []
    for(let date of dates){
        let mediaByDate: IMedia[] = media.filter(m => m.creationDate === date);
        splitedMedia.push(mediaByDate)
    }

    return splitedMedia
}

function getKeywordsToSearch(valueToSearch: ISearchValue): string[]{
    if(valueToSearch.value == '') return []
    let keywords: string[] = valueToSearch.value.split(';')
    for(let i = 0; i < keywords.length; i++){
        keywords[i] = keywords[i].trim()
    }
    return keywords
}

function SetSearchValueClosure(searchValue: ISearchValue){
    const inner = (value: string) =>{
        searchValue.value = value
    }
    return inner
}

export  function MediaPage(){
    let valueToSearch: ISearchValue = { value: '' }

    let keywordsToSearch: string[] = getKeywordsToSearch(valueToSearch)

    const setKeywordsToSearch = SetSearchValueClosure(valueToSearch)     
    
    const { media, error, loading } = useMedia(keywordsToSearch)

    console.log("Media in MediaPage:")
    console.log(media)
    

    // подсчет кол-ва фото и видео
    let mediaCount: number = media.length

    // массив медиа, разбитый по времени создания
    let mediaByDate: IMedia[][] = splitMediaByDate(media);

    console.log("MeidaByDate in MediaPage:")
    console.log(mediaByDate)

    return(
        <>
            { error && <ErrorMessage error={error}></ErrorMessage> }

            <Header searchedValue={keywordsToSearch.join('; ')} searchedObjects={"Media"} setValueToSearch={setKeywordsToSearch}></Header>

            {/* { !loading && <div id="info-pannel" className="py-3 bg-slate-100">
                <p className="text-center italic">
                    <span id="media-count">{ mediaCount } элементов</span>
                </p>
            </div> } */}

            <main className="mx-auto px-0">
                <div className="flex bg-slate-700 flex-col pt-6">
                    { loading && <Loader></Loader> }
                    { mediaByDate.map(m => <MediaGroup media={m} creationDate={new Date(m[0].creationDate)}  key={m[0].id}></MediaGroup>) }
                </div>
                { keywordsToSearch.length != 0 && <div className="fixed top-1/2 left-1/2 w-15 h-15 bg-red-400 rounded-full" onClick={() => keywordsToSearch = []}></div> }
            </main>
        </>  
    )
}