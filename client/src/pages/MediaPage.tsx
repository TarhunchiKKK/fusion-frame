import axios from "axios";
import { MediaGroup } from "../components/MediaGroup";
import { IMedia } from "../models";
import { useMedia } from "../hooks/media";
import { Loader } from "../components/Loader";


export  function MediaPage(){
    const { media, error, loading, addMedia } = useMedia();

    // подсчет кол-ва фото и видео
    let count: number = media.length;
    let photosCount: number = media.filter(m => m.duration === undefined).length;
    let videosCount: number = count - photosCount;

    // массив медиа, разбитый по времени создания
    let mediaByDate: IMedia[][] = [];
    let date: Date = new Date();

    // разбиение массива медиафайлов на руппы по дате создания
    for(let i: number = 0; i < media.length; i++){
        date = media[i].creationDate;
        let nextPosition: number = media.findLastIndex(m => m.creationDate === date);
        mediaByDate.push(media.filter(m => m.creationDate === date));
        i = nextPosition;
    }

    return(
        <>
            { !loading && <div id="info-pannel" className="py-3 bg-slate-100">
                <p className="text-center italic">
                    <span id="photos-count">{ photosCount }</span> фото и <span id="videos-count">{ videosCount }</span> видео
                </p>
            </div> }

            <main className="mx-auto px-0">
                <div className="flex bg-slate-700 flex-col pt-6">

                { loading && <Loader></Loader> }

                { mediaByDate.map(m => <MediaGroup media={m} creationDate={m[0].creationDate}></MediaGroup>) }

                </div>
            </main>

        </>  
    );
}