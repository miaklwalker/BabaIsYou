import makeOrthagonalMap from "./makeOrthagonalMap.js";
import addMessage from "../CustomEvents/addmessage.js";
import Message from "../classes/Message.js";

export default function defeat (message,sprite,config) {
    const {removeSelf,removePlayer,condition,contrary} = config;
    const direction = message.data.direction;
    let {candidates,results,overlaps} = message.data.msg.data;
    let result = results ? results : [];
    let entities = [...candidates,...result,...overlaps];
    let candidatesPool = entities
        .map(potential=>makeOrthagonalMap(potential)[direction])
        .map(potential=>potential.same(sprite.position));

    let collisionPool = entities.filter((item,index)=>{
        let hasCondition = condition ? item[condition] : false;
        if(
            candidatesPool[index] &&
            item[contrary] === undefined && !hasCondition
        ){
            return item;
        }
    });
    let triggered = candidatesPool.includes(true);

    if(triggered && collisionPool.length > 0) {
        if(removeSelf){
            document.dispatchEvent(addMessage(new Message('system', 'defeat', sprite.id)));
        }
        if(removePlayer){
            collisionPool.forEach(({id})=>{
                document.dispatchEvent(addMessage(new Message('system', 'defeat', id)))
            })
        }
    }
}