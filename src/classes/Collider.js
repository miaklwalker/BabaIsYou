import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import makeOrthagonalMap from "../helperFunctions/makeOrthagonalMap.js";



export default class Collider {
    addMessage(message){
        document.dispatchEvent(addMessage(new Message('parser','collider',message)))
    }
    getCollisionPool(entities){
        return entities.filter(entity=>(
            entity.strictCollide ||
            entity.canCollide    ||
            entity.canTouch
        ));
    }
    update(entities,direction){
        let candidates = entities.filter(entity=>entity.YOU !== undefined);
        let collidePool = this.getCollisionPool(entities);
        let results = {};
        candidates.forEach(candidate=>{
            let orthogonalMap = makeOrthagonalMap(candidate);
            collidePool.forEach((potential)=>{
                let {position} = potential;
                if(position.same(orthogonalMap[direction])){
                    let neighbors = potential.updateAndFindNeighbors(collidePool)[direction];
                    let i = 1;
                    while(neighbors){
                        results[i] = neighbors;
                        neighbors = neighbors.updateAndFindNeighbors(collidePool)[direction];
                        i++;
                    }
                    results[0] = potential;
                }
            })
        });
        this.addMessage({results:Object.values(results),candidates,collidePool,direction});
    }
    onMessage=(message)=>{
        if(message.from === 'parser' && message.to ==='collision'){
            let direction = message.data.msg.data.direction;
            this.update(message.data.entities,direction);
        }
    }
}