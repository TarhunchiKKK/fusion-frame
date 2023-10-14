import { useState } from "react";
import { IAlbum, ICreateAlbumDto } from "../../models";
import axios from "axios";
import { ErrorMessage } from "../other/ErrorMesage";

const album: ICreateAlbumDto = {
    name: 'empty'
}

interface CreateAlbumProps{
    onCreate: (album: ICreateAlbumDto) => void;
}

export function CreateAlbum({ onCreate }: CreateAlbumProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    function changeNameHandler(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value);
    }

    async function submitHandler(event: React.FormEvent){
        event.preventDefault();
        setError('');

        if(name.trim().length === 0){
            setError('Album can\'t have empty name');
            return;
        }

        album.name = name;
        const response = await axios.post<ICreateAlbumDto>('http://localhost:3000/albums', album);

        onCreate(response.data);
    }

    return(
        <form action="" onSubmit={submitHandler}>
            <input type="text" className="border py-2 px-4 mb-2 w-full outline-0" value={name} onChange={changeNameHandler} placeholder="Input album name"/>
            { error && <ErrorMessage error={error}></ErrorMessage> }
            <button type="submit" className="py-2 px-4 border bg-yellow-400 hover:text-white">Crete</button>
        </form>
    );
}