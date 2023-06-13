"use server"

import {initFaceApi, Library, loadLibrary} from "@/app/initFaceApi";
import {canvas} from "@/commons";
import * as faceapi from "@vladmandic/face-api"
import {FaceMatcher, LabeledFaceDescriptors} from "@vladmandic/face-api";

export async function detectPhoto(dataUri:string){
    await initFaceApi();
    const library:Library = await loadLibrary();
    const image:any = await canvas.loadImage(dataUri);
    const canva = faceapi.createCanvasFromMedia(image);
    const displaySize = {width:image.width,height:image.height};
    const detections = await faceapi.detectAllFaces(image as any).withFaceLandmarks().withFaceDescriptors();
    const resizeDetections = faceapi.resizeResults(detections,displaySize);
    const faceMatcher = new FaceMatcher(Object.values(library),0.6);
    const results = resizeDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
    results.forEach((result,i) => {
        const box = resizeDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box,{label:result.toString()});
        drawBox.draw(canva);
    })
    return canva.toDataURL();
}