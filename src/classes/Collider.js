import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import Vector from "./Vector.js";

export default class Collider {
    update(entities,direction){
        // All blocks the player controls
        let candidates = entities.filter(entity=>entity.YOU !== undefined);
        // All blocks with the collision flag set
        let collidePool = entities.filter(entity=>entity.canCollide);
        // Will have all blocks the player collides with and whatever they collide with
        let results = [];
        candidates.forEach(candidate=>{
            let orthogonalMap={
            left : new Vector(-1,0).addVector(candidate.position),
            right: new Vector(1,0).addVector(candidate.position),
            up  : new Vector(0,-1).addVector(candidate.position),
            down : new Vector(0,1).addVector(candidate.position)
            };

            collidePool.forEach((potential)=>{
                let {position} = potential;
                if(position.same(orthogonalMap[direction])){
                    let neighbors = potential.updateAndFindNeighbors(collidePool)[direction];
                    while(neighbors){
                        results.push(neighbors);
                        neighbors = neighbors.updateAndFindNeighbors(collidePool)[direction];
                    }
                    results.push(potential);
                }
            })
        });
        this.addMessage({results,candidates,collidePool,direction});
    }
    addMessage(message){
        document.dispatchEvent(addMessage(new Message('parser','collider',message)))

    }
    onMessage=(message)=>{
        if(message.from === 'parser' && message.to ==='collision'){
            this.update(message.data.entities,message.data.msg.data.direction);
        }
    }
}