/**
 * @function loadImage
 * @param url The Url to load the image from
 * @returns {Promise<HTMLImageElement>} A HTMLImageElement that is loaded from url
 */
export default function loadImage(url){
    return new Promise(resolve=>{
        const image = new Image();
        image.addEventListener('load',()=>{
            resolve(image);
        });
        image.src=url;
    })
}