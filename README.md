# CS50 Final Project: Face Recognition

This is a final project for Harvard's CS50 course, written in June 2023: a small Next.js web app that learns people's faces from webcam photos and then recognises them in new photos. On the "Record Photo" page you take three webcam pictures of a person and type their name; a Next.js server action runs face detection, 68-point landmarks and the face recognition network from `@vladmandic/face-api` (a maintained fork of face-api.js) on each picture, and stores the resulting 128-number face descriptors under that name in a local `descriptors.json` file. On the "Detect a Photo" page you take one picture, the server finds every face in it, matches each against the stored descriptors with a Euclidean distance threshold of 0.6, and sends back the image with a labelled box around each face (or "unknown"). All model inference happens on the server in Node.js with TensorFlow.js (`tfjs-node`) and `node-canvas`, using the pre-trained weights committed in `src/weights/`; the browser only captures the photo. It is a learning project and prototype, not a production system.

> CS50 course project from 2023. Not maintained.

## Features

- Webcam capture with `react-html5-camera-photo`
- Enrolment: three photos plus a name per person; enrolling the same name again adds more descriptors to it
- Recognition: detects all faces in a photo, labels each with the closest known name and its distance, or "unknown"
- Face descriptors saved to `descriptors.json` in the project root (git-ignored); no database
- Server-side inference through Next.js server actions (`"use server"`)

## Tech stack

Next.js 13 (App Router, server actions) · React 18 · TypeScript · @vladmandic/face-api · TensorFlow.js (tfjs-node) · node-canvas · Tailwind CSS

## Getting started

Prerequisites: Node.js and npm. `@tensorflow/tfjs-node` and `canvas` are native modules, so the install may need build tools (Python and a C++ compiler) and the Cairo libraries that `canvas` depends on, if no prebuilt binary matches your platform.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
npm run lint
```

The browser asks for camera access on both capture pages. Browsers only allow camera access on `localhost` or over HTTPS.

## Project structure

```text
src/
  app/
    page.tsx               home page with links to Record Photo and Detect a Photo
    photo/page.tsx         takes three photos, asks for a name
    photo/savePhoto.ts     server action: computes descriptors and saves them under the name
    detect/page.tsx        takes one photo and shows the labelled result
    detect/detectPhoto.ts  server action: detects faces, matches them, draws labelled boxes
    initFaceApi.ts         loads model weights once; reads and writes descriptors.json
  commons/                 patches face-api for Node with node-canvas and tfjs-node
  weights/                 pre-trained face-api model weights
```

## Limitations

- The descriptor file is read and written by the server process with no locking, so it is meant for a single local user.
- Detection uses the SSD MobileNet v1 model; the tiny face detector, MTCNN, age/gender and expression weights are included but not used.
- Photos are sent to the server as data URIs and are not stored; only the descriptors are kept. Face descriptors are biometric data, so treat `descriptors.json` accordingly.
