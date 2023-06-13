"use client"
import Camera from "react-html5-camera-photo";
import 'react-html5-camera-photo/build/css/index.css';
import {savePhoto} from "@/app/photo/savePhoto";
import {useState} from "react";
import Image from "next/image";

const requiredPictures = 3;
const label = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth']
export default function Page() {
    const [state, setState] = useState<{pictures:string[]}>({
        pictures: []
    });
    const pictureIsEnough = state.pictures.length === requiredPictures;
    if (pictureIsEnough) {
        return (<>
            <main
                className={'flex h-screen bg-slate-500 justify-center items-center text-slate-50 w-screen overflow-hidden'}>
                <form className={'flex flex-col gap-3 p-10 w-full box-border'} action={savePhoto}>
                    <div className={'flex w-full box-border'}>
                        {state.pictures.map((p, index) => {
                            return <div className={`w-1/${requiredPictures} box-borders p-5`} key={index}>
                                <Image src={p} alt={`Person ${label[index]} image`}/>
                                <input type={'hidden'} name={`photo-${index}`} value={p}/>
                            </div>
                        })}
                    </div>

                    <label className={'flex flex-col'}>
                        <div>Please enter the name</div>
                        <input name={"name"} alt={"Label name"} className={'p-2 text-slate-500'}
                               required={true}></input>
                    </label>
                    <button type={'submit'} className={'p-2 border-2 '}>Save</button>
                </form>
            </main>
        </>)
    }
    return (<>

            <Camera onTakePhoto={async (dataUri) => {
                setState(old => {
                    const newState = {...old};
                    newState.pictures = [...newState.pictures, dataUri];
                    return newState;
                });
            }} isFullscreen={true}/>
            <h1 className={'absolute top-10 left-10'}>Take a {label[state.pictures.length]} Picture </h1>
        </>
    );
}