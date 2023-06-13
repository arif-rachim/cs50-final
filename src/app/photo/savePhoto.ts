"use server"
import {redirect} from "next/navigation";
import {RedirectType} from "next/dist/client/components/redirect";
import fs from "fs";
import path from "path";
import * as faceapi from "@vladmandic/face-api";
import {canvas} from '../../commons';
import {LabeledFaceDescriptors} from "@vladmandic/face-api";
import {Image} from "canvas";
import {initFaceApi, loadLibrary, saveLibrary} from "@/app/initFaceApi";


export async function savePhoto(formData: FormData) {
    await initFaceApi();
    const library = await loadLibrary();
    const name = formData.get('name') as string;
    const descriptors = await Promise.all(Array.from(formData.keys()).filter((value) => value.startsWith('photo')).map(async (key) => {
        const dataUri: string = formData.get(key) as string;
        const image: Image = await canvas.loadImage(dataUri);
        const detections = await faceapi.detectSingleFace(image as any).withFaceLandmarks().withFaceDescriptor();
        return detections.descriptor;
    }));
    const currentDescriptors = library[name] ?? {descriptors: []};
    library[name] = new LabeledFaceDescriptors(name, [...currentDescriptors.descriptors, ...descriptors]);
    await saveLibrary(library);
    return redirect('/', RedirectType.replace);
}
