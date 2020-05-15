import Vector from "./Vector.js";
import makeUniqueId from "../helperFunctions/MakeID.js";


export default class Block {
    constructor(x,y){
        this.position = new Vector(x,y);
        this.traits = [];
        this.id = makeUniqueId(12)
        this.neighbors = {
            left:false,
            right:false,
            up:false,
            down:false,
        };
        this.canCollide = false;
    }
    draw(){
        return [this.position.x,this.position.y]
    }
    onMessage(message){
        this.traits.forEach(trait=>{
            trait.update(this,message);
        })
    }
    addTrait(trait){
        this[trait.NAME] = trait;
        this.traits.push(trait);
    }
    checkNeighbors=(other)=>{
        const {x,y} = this.position;
        let left = new Vector(x-1, y).same(other.position);
        let right = new Vector(x+1 , y).same(other.position);
        let up = new Vector(x,y-1).same(other.position);
        let down = new Vector(x,y+1).same(other.position);
        return [left,down,right,up];
    };
    updateAndFindNeighbors=(neighbors)=>{
        let matches = [];
        neighbors.forEach(other => {
            let result = this.checkNeighbors(other);
            if(result.includes(true)){
                matches.push(other);
                const [left,down,right,up]=result;
                if(left) this.neighbors.left = true;
                if(right)this.neighbors.right = true;
                if(up)   this.neighbors.up = true;
                if(down) this.neighbors.down = true;
            }
        });
        return matches;
    }
}

