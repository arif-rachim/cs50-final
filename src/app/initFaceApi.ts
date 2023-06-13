import path from "path";
import {faceDetectionNet} from "@/commons";
import * as faceapi from "@vladmandic/face-api";
import fs from "fs";
import {LabeledFaceDescriptors} from "@vladmandic/face-api";

let isLoaded = false;

export async function initFaceApi() {
    if (isLoaded === true) {
        return;
    }
    const weightsDir = path.join(process.cwd(), 'src', 'weights');
    await faceDetectionNet.loadFromDisk(weightsDir);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(weightsDir);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(weightsDir);
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(weightsDir);
    isLoaded = true;
}

export type Library = { [key: string]: LabeledFaceDescriptors };

export async function loadLibrary(): Promise<Library> {
    const descriptor_file = path.join(process.cwd(), 'descriptors.json');
    const content = await fs.promises.readFile(descriptor_file, {encoding: 'utf-8'});
    let library: Library = {};
    if (content) {
        const ctn = JSON.parse(content);
        Object.keys(ctn).forEach((key:string) => {
            const descriptors = ctn[key].descriptors.map((f: number[]) => {
                return new Float32Array(f)
            });

            library[key] = new LabeledFaceDescriptors(key, descriptors);
        })
    }
    return library;
}

export async function saveLibrary(library: Library) {
    const descriptor_file = path.join(process.cwd(), 'descriptors.json');
    await fs.promises.writeFile(descriptor_file, JSON.stringify(library, null, 4));
}