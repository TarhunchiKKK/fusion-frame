import { Link } from "react-router-dom";

interface IHeaderProps{

}

export function Header(){
    return(
        <header className="bg-slate-700 mx-auto">
            <nav className="pt-6 pb-4 flex justify-between">
                <img src="../../images/search.svg" alt=""></img> 
                    <div className="space-x-8">
                        <Link to="/" className="bg-red-600 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500">Фото</Link>
                        <Link to="/albums" className="bg-red-600 px-4 py-2 rounded-2xl hover:border-2 hover:border-purple-500  border-2 border-purple-500">Альбомы</Link>
                    </div>
                <img src="../../icons/dots.svg" alt=""></img>
            </nav>
        </header>
    )
}