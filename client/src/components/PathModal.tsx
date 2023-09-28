import { useState } from "react";
import { IPath } from "../models";

interface PathModalProps{
    paths: IPath[];
    children: React.ReactNode;
    onSubmit: () => void;
    onAdd: () => void;
    onClose: () => void;
}

export function PathModal({ children, paths, onClose }: PathModalProps){
    return (
        <div className="container rounded-3xl bg-white w-3/5">
            <div className="flex flex-row justify-end pt-6 w-4/5">
                <div className="rounded-full h-4 w-4">
                    <img src="../icons/plus.svg" alt="" />
                </div>
                <div className="rounded-full h-4 w-4">
                    <img src="../icons/plus.svg" alt="" />
                </div>
            </div>       

            <div className="container flex flex-col justify-start bg-slate-500 w-4/5">
                {/* <Path></Path> */}
            </div>

            <div className="container w-4/5">
                <form className="flex flex-row" action="" onSubmit={}>
                    <input type="text" placeholder="Paste path here..." value={}/>
                    <button type="submit" className="rounded-3xl p-2 bg-red-400" ></button>
                </form>
            </div>
        </div>
    );
}