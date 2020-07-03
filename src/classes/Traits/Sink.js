import Trait from "./Trait.js";
import addMessage from "../../CustomEvents/addmessage.js";
import Message from "../Message.js";
import Vector from "../Vector.js";

function defeatImplement(entity,self,contrary,direction){
    document.dispatchEvent(
        addMessage(
            new Message(
                'system',
                'defeat',
                ()=>{
                    let additiveForce = {
                        up:new Vector(0,-1),
                        down:new Vector(0,1),
                        left:new Vector(-1,0),
                        right:new Vector(1,0)
                    };
                    let correctedPosition = additiveForce[direction];
                    correctedPosition.addVector(entity.position);
                    if(correctedPosition.same(self.position)){
                        return [entity.id,self.id];
                    }
                })));

}



export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
        sprite.canTouch = true;

        if(message.to === sprite.id ){
            const {results,overlaps,candidates} = message.data.msg.data;
            const {direction} = message.data;
            let toCheck = [...results,...overlaps,...candidates];
            toCheck.forEach(entity=>{
                defeatImplement(entity,sprite,"FLOAT",direction);
            })
        }
    }
}