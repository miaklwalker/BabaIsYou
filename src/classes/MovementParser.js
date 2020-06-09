import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";

export default class MovementParser{
    constructor(){
        this.entities = [];
    }
    parseFromControls(msg){
        document.dispatchEvent(addMessage(new Message(
            'collision',
            'parser',
            {entities:this.entities.flat(),msg}
        )));
    }
    handleNoCollisions(candidates,direction){
        candidates.forEach(entity=>{
            document.dispatchEvent(addMessage(new Message(entity.id,'parser',{direction})));
        })
    }
    handleNoStop(){
        document.dispatchEvent(addMessage(new Message('controls','parser','finished')));
    }
    onMessage(msg){
        if(msg.to === 'parser' && msg.from === 'controls' && msg.data.action ==='run'){

            this.parseFromControls(msg);

        }else if(msg.to === 'parser' && msg.from === 'collider'){
            let{results,candidates,direction} = msg.data;
            // No Collisions.
            if(results.length === 0){
                this.handleNoCollisions(candidates,direction);
            }
            //
            else if(results.map(entity=>entity['STOP']).some(trait=>trait !== undefined)){
                this.handleNoStop();
                return;
            }
            else{
                [...candidates,...results].forEach(entity=>{
                    document.dispatchEvent(addMessage(new Message(entity.id,'parser',{direction,msg})));
                })
            }
            this.handleNoStop();
        }
    }
    purge(){
        this.entities = [];
    }
    removeEntity(targetId){
        let entities = this.entities[0];
        console.log();
       this.entities = [entities.filter(({id})=>id !== targetId.id)];


    }

}