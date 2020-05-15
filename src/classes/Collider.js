import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";

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
    update(entities){
        this.found = false;
        for(let candidate of getCandidates(entities)){
            let reducer = collisionReducer();
            entities.forEach(entity=>{
                let possible = candidate.checkNeighbors(entity);
                if(possible.includes(true) && entity.canCollide){
                    this.sentFalse = true;
                    this.found = true;
                    document.dispatchEvent(addMessage(new Message('you','collider',reducer(possible))))
                }
                document.dispatchEvent(addMessage(new Message(entity.id,'collider',possible)))
            });
        }
        if(this.sentFalse && !this.found){
            document.dispatchEvent(addMessage(new Message('you','collider',[false,false,false,false])));
            this.sentFalse = false;
        }
    }
    onMessage(message){

    }
}