import Block from "../Block.js";
let counter = 0 ;
export function chooseShape([left,down,right,up]){
         if(!left && !down && !right && !up ){
             return 'single'
         }
        if(left  && !down && !right && !up ){
            return 'left'
        }
        if(!left &&  down && !right && !up ){
            return 'bottom'
        }
        if(!left && !down &&  right &&  up ){
            return'bottomLeft'
        }
        if(!left && !down && right &&  !up ){
            return'right'
        }
        if(left  && !down &&  right && !up ){
            return'middle'
        }
        if(left  && !down && !right &&  up ){
            return'bottomRight'
        }
        if(left  && !down &&  right &&  up ){
            return'middleJoint'
        }
        if(!left && !down && !right &&  up ){
            return'top'
        }
        if(!left &&  down &&  right && !up ){
            return'topLeft'
        }
        if(!left &&  down && !right &&  up ){
            return'verticalMiddle'
        }
        if(!left &&  down &&  right &&  up ){
            return'verticalMiddleRight'
        }
        if(left  &&  down && !right && !up ){
            return'topRight'
        }
        if(left  &&  down &&  right && !up ){
            return'middleDown'
        }
        if(left  &&  down && !right &&  up ){
            return'verticalMiddleLeft'
        }
        if(left  &&  down &&  right &&  up ){
            return'fourWay'
        }
    return 'single';
}


export default class Wall extends Block{
    constructor(x,y) {
        super(x,y);
        this.type = 'WALL';
        this.name = 'WALL';
        this.ran = false;
    }
    draw(others){
        this.chooseName(others);
        return [...super.draw(),this.name,undefined,this.type]
    }
    chooseName(neighbors){
        this.updateAndFindNeighbors(neighbors);
        let {left,down,right,up} = this.neighbors
        this.name = chooseShape([left,down,right,up]);
        if(counter < 100){
            console.log(left,down,right,up,this.name);
            counter++
        }
    }
}