import addMessage from "../CustomEvents/addmessage.js";
import Message from "../classes/Message.js";
import Vector from "../classes/Vector.js";
import makeOrthagonalMap from "./makeOrthagonalMap.js";

export default function defeatImplement(entity,self,contrary,direction,condition){
    let hasContrary = contrary ? entity[contrary] === undefined : true;
    let hasCondition = condition ? entity[condition] !== undefined : true;
    console.log(entity);
    console.log(self);
    console.log(contrary);
    console.log(direction);
    console.log(condition);
    // document.dispatchEvent(
    //     addMessage(
    //         new Message(
    //             'system',
    //             'defeat',
    //             ()=>{
    //                 let position = entity.position;
    //                 let correctedPosition= makeOrthagonalMap(position)[direction];
    //                 if((correctedPosition.same(self.position)||
    //                     entity.position.same(self.position)) &&
    //                     hasContrary &&
    //                     hasCondition){
    //                     return [entity.id,self.id];
    //                 }
    //             })));

}