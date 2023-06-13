// import nodejs bindings to native tensorflow,
// not required, but will speed up things drastically (python required)
import '@tensorflow/tfjs-node';

import * as faceapi from '@vladmandic/face-api';

// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData

import canvas from "canvas";


// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const Canvas:any = canvas.Canvas;
const Image:any = canvas.Image;
const ImageData:any = canvas.ImageData;
faceapi.env.monkeyPatch({Canvas, Image, ImageData})

export {canvas}