export default class Renderer{
    constructor(){
        this.layers = [];
    }
    render(canvas,context){
        this.layers.forEach(layer=>{
            if(layer.priority !== 0) {
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
}