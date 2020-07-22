import makeOrthagonalMap from "./makeOrthagonalMap.js";
import addMessage from "../CustomEvents/addmessage.js";
import Message from "../classes/Message.js";

function checkTouching (entities,sprite,direction){
    return entities
        .map(potential=>makeOrthagonalMap(potential)[direction])
        .map(potential=>potential.same(sprite.position));
}
function checkCondition (condition,contrary,candidatePool){
    return (item,index) => {
        let hasCondition = condition ? item[condition] : true;
        if(candidatePool[index] && !item[contrary] && hasCondition){
            return item;
        }
    }
}

export default function defeat (message,sprite,config) {
    const {removeSelf,removePlayer,condition,contrary} = config;
    const direction = message.data.direction;
    let {candidates,results,overlaps} = message.data.msg.data;

    let result = results ? results : [];
    let entities = [...candidates,...result,...overlaps];

    let candidatesPool = checkTouching(entities,sprite,direction);

    let collisionPool = entities.filter(
        checkCondition(condition,contrary,candidatesPool)
    );
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