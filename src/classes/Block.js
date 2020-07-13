import Vector from "./Vector.js";
import makeUniqueId from "../helperFunctions/MakeID.js";


export default class Block {
    constructor(x,y,name,type){
        this.position = new Vector(x,y);
        this.traits = [];
        this.id = makeUniqueId(12);
        // draw values
        this.name = name;
        this.group = null;
        this.type = type;
        this.alias = null;

        this.strategy = null;


        // flags
        this.neighbors = {
            left:false,
            right:false,
            up:false,
            down:false,
        };
        this.strictCollide = false;
        this.canCollide = false;
        this.canTouch = false;
        this.overlap = false;
    }
    draw(){
        return [
            this.position.x,
            this.position.y,
            this.name,
            this.group,
            this.type,
            this.alias,

        ]
    }
    resetFlags(){
        this.canCollide = false;
        this.canTouch = false;
        this.strictCollide = false;
    }
    onMessage(message){
        this.resetFlags();
        this.traits.forEach(trait=>{
            trait.update(this,message);
        })
    }
    addTrait(trait){
        this[trait.NAME] = trait;
        this.traits.push(trait);
    }
    isNeighbor(other){
        return this.checkNeighbors(other).includes(true);
    }
    checkNeighbors=(other)=>{
        const {x,y} = this.position;
        let left = new Vector(x-1, y).same(other.position);
        let right = new Vector(x+1 , y).same(other.position);
        let up = new Vector(x,y-1).same(other.position);
        let down = new Vector(x,y+1).same(other.position);
        let overlap = new Vector(x,y).same(other.position) && other !== this;
        return [left,down,right,up,overlap];
    };
    updateAndFindNeighbors=(neighbors)=>{
        let matches = {};
        this.neighbors.left =   false;
        this.neighbors.right =  false;
        this.neighbors.up =     false;
        this.neighbors.down =   false;
        neighbors.forEach(other => {
            let result = this.checkNeighbors(other);
            if(result.includes(true)){
                const [left,down,right,up,overlap]=result;
                if(left) {
                    matches.left = other;
                    this.neighbors.left = true
                }
                if(right){
                    matches.right = other;
                    this.neighbors.right = true
                }
                if(up)   {
                    matches.up = other;
                    this.neighbors.up = true
                }
                if(down) {
                    matches.down = other;
                    this.neighbors.down = true
                }
                if(overlap){
                    matches.overlap = other;
                }
            }
        });
        return matches;
    }
}

