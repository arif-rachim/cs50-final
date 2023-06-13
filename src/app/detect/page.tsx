"use client"
import Camera from "react-html5-camera-photo";
import {detectPhoto} from "@/app/detect/detectPhoto";
import {useState} from "react";
import Image from "next/image";

export default function Page() {
    const [imageURI, setImageURI] = useState<string | null>(null);
    if (imageURI) {
        return <>
            <main className={'flex w-screen h-screen flex-col bg-slate-500'}>
                <Image src={imageURI} alt={'Photo of image'}/>
            </main>
        </>
    }
    return <>
        <main className={'flex w-screen h-screen flex-col'}>
            <Camera idealFacingMode={"user"} onTakePhoto={async (dataUri) => {
                const imageURI = await detectPhoto(dataUri);
                setImageURI(imageURI);
            }} isFullscreen={true}/>
        </main>
    </>
}