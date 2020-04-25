function getColorCoords(x,y,num){
    let cx = x + (num % 8 * 8);
    let cy = y +  (num > 7 ? Math.floor(num / 8) : 0) * 8;
    return [cx, cy, 8, 8];
}


export default class Renderer{
    constructor(){
        this.layers = [];
        this.palette = null;
    }
    changePalette(palette){
        this.palette = palette;
    }
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
    addLayer(layer){
        this.layers.push(layer);
        this.layers = this.layers.sort(this.sortLayer);
    }
    tint=(canvas ,context ,sprite, img, index)=>{
        const [x, y, w, h] = sprite;
        const [cx,cy] = this.palette;
        let size = 32;
        context.clearRect(0, 0, size, size);
        context.globalCompositeOperation = 'source-over';
        context.drawImage(img, ...getColorCoords(cx,cy,index), 0, 0, size, size);
        context.globalCompositeOperation = 'destination-in';
        context.drawImage(img, x, y, w, h, 0, 0, size,size);
        context.globalCompositeOperation = 'darken';
        context.drawImage(img, x, y, w, h, 0, 0, size, size);
    }
}