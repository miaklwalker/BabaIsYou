import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import Vector from "./Vector.js";
import makeOrthagonalMap from "../helperFunctions/makeOrthagonalMap.js";



export default class Collider {
    update(entities,direction){
        // All blocks the player controls
        let candidates = entities.filter(entity=>entity.YOU !== undefined);
        // All blocks with the collision flag set
        let collidePool = entities.filter(entity=>(
            entity.strictCollide ||
            entity.canCollide    ||
            entity.canTouch
        ));
        // Will have all blocks the player collides with and whatever they collide with
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
    addMessage(message){
        document.dispatchEvent(addMessage(new Message('parser','collider',message)))
    }
    onMessage=(message)=>{
        if(message.from === 'parser' && message.to ==='collision'){
            let direction = message.data.msg.data.direction;
            this.update(message.data.entities,direction);
        }
    }
}