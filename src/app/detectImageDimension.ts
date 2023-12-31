export function detectImageDimension(base64Uri):Promise<{width,height}>{
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve({width:image.width,height:image.height});
        }
        image.src = base64Uri;
    })
}