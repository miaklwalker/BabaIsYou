import addMessage from "../CustomEvents/addmessage.js";
import Message from "../classes/Message.js";
import Vector from "../classes/Vector.js";

export default function defeatImplement(entity,self,contrary,direction,condition){
    let hasContrary = contrary ? entity[contrary] === undefined : true;
    let hasCondition = condition ? entity[condition] !== undefined : true;
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
                    if(
                        (correctedPosition.same(self.position)||
                            entity.position.same(self.position)) &&
                        hasContrary &&
                        hasCondition
                    ){
                        return [entity.id,self.id];
                    }
                })));

}