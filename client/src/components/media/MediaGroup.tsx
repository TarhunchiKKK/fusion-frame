import { IMedia } from "../../models"
import { Media } from "./Media"

interface MediaGroupProps{
    media: IMedia[]
    creationDate: Date
}

// преобразование даты в формат "число месяц_буквами год"
function parseDate(date: Date): string{
    let day: number = date.getDay()
    let year: number = date.getFullYear()
    let month: string = ''
    switch(date.getMonth()) {
        case 1:
            month = 'Января'
            break
        case 2:
            month = 'Февраля'
            break
        case 3:
            month = 'Марта'
            break
        case 4:
            month = 'Апреля'
            break
        case 5:
            month = 'Мая'
            break
        case 6:
            month = 'Июня'
            break
        case 7:
            month = 'Июля'
            break
        case 8:
            month = 'Августа'
            break
        case 9:
            month = 'Сентября'
            break
        case 10:
            month = 'Октября'
            break
        case 11:
            month = 'Ноября'
            break
        default:
            month = 'Декабря'
            break
    }
    return `${day} ${month} ${year}`
}

export function MediaGroup({media, creationDate}: MediaGroupProps){
    return(
        <div className="pt-4">
            <h3 className="date">{ parseDate(creationDate) }</h3>
            <hr className="bg-blue-900 mt-2 mb-1"></hr>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0">
                { media.map(m => <Media media={m} key={m.id}></Media>) }
            </div>
        </div>
    )
}