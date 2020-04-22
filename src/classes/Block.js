import Vector from "./Vector.js";
import makeUniqueId from "../helperFunctions/MakeID.js";

export default class Block {
    constructor(x,y){
        this.position = new Vector(x,y);
    }
    draw(canvas,context,divisions){

    }
}

class nounBlock extends Block{
    constructor(x,y,name,type,id = makeUniqueId(12)) {
        super(x,y);
        this.name = name;
        this.type = type;
        this.id = id;
    }
    draw(canvas,context,divisions){
        const {position:{x:x1,y:y1}} = this;
        let width = (canvas.width / divisions);
        let height = (canvas.height / divisions);
        let x = x1 * width;
        let y = y1 * height;

        context.fillStyle = 'red';
        context.fillRect(x,y,width,height)
    }
}