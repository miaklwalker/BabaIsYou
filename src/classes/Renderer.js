import Layer from "./Layer.js";
import buildTexturePack from "../helperFunctions/buildTexturePack.js";

export function getColorCoords(x,y,num){
    let cx = x + (num % 7 * 8 );
    let cy = y +  (num > 6 ? Math.floor(num / 7) : 0) * 8;
    return [cx, cy, 8, 8];
}

export default class Renderer{
    constructor(game){
        this.layers = [];
        this.palette = [488, 24, 56, 40];
        this.texture = buildTexturePack(384, 1512);
        this.divisions = game.gridDiminsions;
        this.cache = new Map();
    }
    changePalette=(palette)=>{
        this.palette = palette;
    };
    changeTexture=(texture)=>{
        this.texture = buildTexturePack(...texture);
    };
    render(canvas,context){
        this.layers.forEach(layer=>{
            if(layer.priority > 0) {
                layer.callback(canvas, context, ...layer.args)
            }
        });
    }
    renderImage(image,x1,y1,x2,y2){
        this.addLayer(new Layer(1,(canvas,context)=>{
            let xOffset = (canvas.width/this.divisions);
            let yOffset = (canvas.height/this.divisions);
            let nX = x1 * xOffset;
            let nY = y1 * yOffset;
            context.drawImage(image,
                x2,y2,32,32,
                nX,nY,
                xOffset,
                yOffset)
        }))
    }
    sortLayer(layerA,layerB){
        if(layerA.priority > layerB.priority){
            return 1
        }
        if(layerA.priority < layerB.priority){
            return -1
        }
        if(layerA.priority === layerB.priority){
            return 0
        }
    }
    addLayer(layer){
        this.layers.push(layer);
        this.layers = this.layers.sort(this.sortLayer);
    }
    tint=(canvas ,context ,sprite, img, index)=>{
        const [x, y, w, h] = sprite;
        const [cx, cy] = this.palette;
        let width = 480 / this.divisions;
        let height = 480 / this.divisions;
        context.clearRect(0, 0, width, height);
        context.globalCompositeOperation = 'source-over';
        context.drawImage(img, ...getColorCoords(cx, cy, index), 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.drawImage(img, x, y, w, h, 0, 0, width, height);
        context.globalCompositeOperation = 'darken';
        context.drawImage(img, x, y, w, h, 0, 0, width, height);
    }
}