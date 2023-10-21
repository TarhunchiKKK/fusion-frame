import axios from "axios"
import { MediaGroup } from "../components/media/MediaGroup"
import { IMedia } from "../models"
import { useMedia } from "../hooks/media"
import { Loader } from "../components/other/Loader"
import { ErrorMessage } from "../components/other/ErrorMesage"


function trimMediaDates(media: IMedia[]): IMedia[] {
    for (let m of media){
        m.creationDate = m.creationDate.substring(0, 10)
        m.path = '../src/images/Picture1.jfif'
    }
    return media
}


function splitMediaByDate(media: IMedia[]): IMedia[][]{    
    media = trimMediaDates(media)

    console.log('Media:')
    console.log(media)


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


export  function MediaPage(){
    const { media, error, loading } = useMedia()

    // подсчет кол-ва фото и видео
    let mediaCount: number = media.length

    // массив медиа, разбитый по времени создания
    let mediaByDate: IMedia[][] = splitMediaByDate(media);

    return(
        <>
            { error && <ErrorMessage error={error}></ErrorMessage> }

            { !loading && <div id="info-pannel" className="py-3 bg-slate-100">
                <p className="text-center italic">
                    <span id="media-count">{ mediaCount } элементов</span>
                </p>
            </div> }

            <main className="mx-auto px-0">
                <div className="flex bg-slate-700 flex-col pt-6">

                { loading && <Loader></Loader> }

                { mediaByDate.map(m => <MediaGroup media={m} creationDate={new Date(m[0].creationDate)}  key={m[0].id}></MediaGroup>) }

                </div>
            </main>

        </>  
    )
}