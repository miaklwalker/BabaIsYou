import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import Vector from "./Vector.js";

function* getCandidates(entities){
    for(let i = 0 ; i < entities.length ; i++){
        if(entities[i].YOU !== undefined){
            yield entities[i]
        }
    }
}
function collisionReducer(){
    let temp = [false,false,false,false];
    return(other)=>{
        if(other === undefined)return temp;
        if(other.includes(true)){
            let location = other.indexOf(true);
            temp[location] =  true;
        }
        return temp;
    }
}

export default class Collider {
    constructor(){
        this.sentFalse = false;
        this.found = false;
    }
    update(entities,direction){
        // this.found = false;
        // for(let candidate of getCandidates(entities)){
        //     let reducer = collisionReducer();
        //     entities.forEach(entity=>{
        //         let possible = candidate.checkNeighbors(entity);
        //         if(possible.includes(true) && entity.canCollide){
        //             this.sentFalse = true;
        //             this.found = true;
        //             this.addMessage({collisionData:reducer(possible),entity,entities});
        //         }
        //         document.dispatchEvent(addMessage(new Message(entity.id,'collider',{possible,entities})))
        //     });
        // }
        // if(this.sentFalse && !this.found){
        //     this.addMessage({collisionData:[false,false,false,false]});
        //     this.sentFalse = false;
        // }
        let candidates = entities.filter(entity=>entity.YOU !== undefined);
        let collidePool = entities.filter(entity=>entity.canCollide);
        let results = [];
        candidates.forEach(candidate=>{
            let orthMap={
            left : new Vector(-1,0).addVector(candidate.position),
            right: new Vector(1,0).addVector(candidate.position),
            up  : new Vector(0,-1).addVector(candidate.position),
            down : new Vector(0,1).addVector(candidate.position)
            };

            collidePool.forEach((potential)=>{
                let {position} = potential;
                if(position.same(orthMap[direction])){
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
        //document.dispatchEvent(addMessage(new Message('you','collider',message)));
        document.dispatchEvent(addMessage(new Message('parser','collider',message)))

    }
    onMessage=(message)=>{
        if(message.from === 'parser' && message.to ==='collision'){
            this.update(message.data.entities,message.data.msg.data.direction);
        }
    }

}