import { IMedia } from "../../models"
import { Media } from "./Media"

interface MediaGroupProps{
    media: IMedia[]
    creationDate: Date
    openMediaModal: () => void
    setCurrentMedia: (currentMedia: IMedia) => void
}

// преобразование даты в формат "число месяц_буквами год"
function parseDate(date: Date): string{
    let day: number = date.getDate()
    let year: number = date.getFullYear()
    let month: string = ''
    switch(date.getMonth()) {
        case 0:
            month = 'Января'
            break
        case 1:
            month = 'Февраля'
            break
        case 2:
            month = 'Марта'
            break
        case 3:
            month = 'Апреля'
            break
        case 4:
            month = 'Мая'
            break
        case 5:
            month = 'Июня'
            break
        case 6:
            month = 'Июля'
            break
        case 7:
            month = 'Августа'
            break
        case 8:
            month = 'Сентября'
            break
        case 9:
            month = 'Октября'
            break
        case 10:
            month = 'Ноября'
            break
        default:
            month = 'Декабря'
            break
    }
    return `${day} ${month} ${year}`
}

export function MediaGroup({media, creationDate, openMediaModal, setCurrentMedia}: MediaGroupProps){
    return(
        <div className="pt-4">
            <h3 className="date">{ parseDate(creationDate) }</h3>
            {/* <hr className="bg-blue-900 mt-2 mb-1"></hr> */}
            <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0">
                { media.map(m => <Media media={m} openMediaModal={openMediaModal} setCurrentMedia={setCurrentMedia} key={m.id}></Media>) }
            </div>
        </div>
    )
}