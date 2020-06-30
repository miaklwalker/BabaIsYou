import Layer from "./Layer.js";
import getColorCoords from '../helperFunctions/getColorCoords.js'


export default class Renderer{
    constructor(game){
        this.layers = [];
        this.palette = [488, 24, 56, 40];
        this.texture = null;
        this.game = game
    }
    get divisions(){
        return this.game.gridDiminsions;
    }
    purge(){
        this.layers = [];
        this.layers.length = 0;
    }
    changePalette=(palette)=>{
        this.palette = palette;
    };
    addTexture=(texture)=>{
        this.texture = texture
    };
    render(canvas,context){
        this.layers.forEach(layer=>{
            if(layer.priority > 0) {
                layer.callback(canvas, context, ...layer.args)
            }
        });
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
    addLayer(...layer){
            layer.forEach(subLayer=>{
                this.layers.push(subLayer)
            });
        this.layers = this.layers.sort(this.sortLayer);
    }
    tint=(canvas ,context ,sprite, img, index)=>{
        const [x, y, w, h] = sprite;
        const [cx, cy] = this.palette;
        let width = Math.ceil(480 / this.divisions[0])+1;
        let height = Math.ceil(480 / this.divisions[1])+1;
        let endDim = [0,0,width,height];
        context.drawImage(img, ...getColorCoords(cx, cy, index), ...endDim);
        let colorData = context.getImageData(1,1,1,1);
        context.clearRect(...endDim);
        context.drawImage(img, x, y, w, h, ...endDim);
        let spriteData = context.getImageData(...endDim);
        let[r,g,b,a] = colorData.data;
        for(let i = 0; i < spriteData.data.length ; i+=4){
            if(    spriteData.data [i]   === 255
                && spriteData.data [i+1] === 255
                && spriteData.data [i+2] === 255
            ){
                spriteData.data [i]   = r;
                spriteData.data [i+1] = g;
                spriteData.data [i+2] = b;
                spriteData.data [i+3] = a
            }else if(spriteData.data [i] > 0
                && spriteData.data [i+1] > 0
                && spriteData.data [i+2] > 0
            ){
                spriteData.data [i]   = r * spriteData.data [i]  /255;
                spriteData.data [i+1] = g * spriteData.data [i+1]/255;
                spriteData.data [i+2] = b * spriteData.data [i+2]/255;
                spriteData.data [i+3] = a
            }
        }
        context.putImageData(spriteData,0,0);
        context.globalCompositeOperation = 'destination-in';
        context.drawImage(img, x, y, w, h, ...endDim);
    }
}
