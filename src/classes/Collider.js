import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";

function* getCandidates(entities){
    for(let i = 0 ; i < entities.length ; i++){
        if(entities[i].YOU !== undefined){
            yield entities[i]
        }
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

            entities.forEach(entity=>{
                let possible = candidate.checkNeighbors(entity);
                if(possible.includes(true)){
                    this.sentFalse = true;
                    this.found = true;
                    document.dispatchEvent(addMessage(new Message('you','collider',possible)))
                }
            });
        }
        if(this.sentFalse && !this.found){
            document.dispatchEvent(addMessage(new Message('you','collider',[false,false,false,false])));
            this.sentFalse = false;
        }
    }
    makeResults(temp,update){
        // [ false, true, false, false]

    }
}