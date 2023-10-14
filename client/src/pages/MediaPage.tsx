import axios from "axios"
import { MediaGroup } from "../components/media/MediaGroup"
import { IMedia } from "../models"
import { useMedia } from "../hooks/media"
import { Loader } from "../components/other/Loader"
import { ErrorMessage } from "../components/other/ErrorMesage"

function splitMediaByDate(media: IMedia[]): IMedia[][]{
    // массив медиа, разбитый по времени создания
    let mediaByDate: IMedia[][] = []
    let date: Date = new Date()
 
    // разбиение массива медиафайлов на руппы по дате создания
    for(let i: number = 0; i < media.length; i++){
        date = media[i].creationDate
        //let nextPosition: number = media.findLastIndex(m => m.creationDate === date)
        let nextPosition: number = i;
        while(media[nextPosition].creationDate === date) nextPosition++
        mediaByDate.push(media.filter(m => m.creationDate === date))
        i = nextPosition - 1
    }

    return mediaByDate
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

                { mediaByDate.map(m => <MediaGroup media={m} creationDate={m[0].creationDate}></MediaGroup>) }

                </div>
            </main>

        </>  
    )
}