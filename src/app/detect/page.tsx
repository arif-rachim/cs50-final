"use client"
import Camera from "react-html5-camera-photo";
import {detectPhoto} from "@/app/detect/detectPhoto";
import {useState} from "react";
import Image from "next/image";
import {detectImageDimension} from "@/app/detectImageDimension";

export default function Page() {
    const [imageURI, setImageURI] = useState<string | null>(null);
    const [dimension,setDimension] = useState<{width:number,height:number} | null>(null);
    if (imageURI && dimension) {
        return <>
            <main className={'flex w-screen h-screen flex-col bg-slate-500'}>
                <Image src={imageURI} alt={'Photo of image'} width={dimension?.width} height={dimension?.height}/>
            </main>
        </>
    }
    return <>
        <main className={'flex w-screen h-screen flex-col'}>
            <Camera idealFacingMode={"user"} onTakePhoto={async (dataUri) => {
                const dimension = await detectImageDimension(dataUri);
                const imageURI = await detectPhoto(dataUri);
                setDimension(dimension);
                setImageURI(imageURI);
            }} isFullscreen={true}/>
        </main>
    </>
}