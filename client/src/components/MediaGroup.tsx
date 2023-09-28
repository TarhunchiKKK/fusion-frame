import { IMedia, IMediaGroup } from "../models";
import { Media } from "./Media";

interface MediaGroupProps{
    media: IMedia[];
    creationDate: Date; 
}

export function MediaGroup({media, creationDate}: MediaGroupProps){
    return(
        <div className="pt-4">
            <h3 className="date">{ creationDate.toISOString() }</h3>
            <hr className="bg-blue-900 mt-2 mb-1"></hr>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0">
                { media.map(m => <Media media={m} key={m.id}></Media>) }
            </div>
        </div>
    );
}