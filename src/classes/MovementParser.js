import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";

export default class MovementParser{
    constructor(){
        this.entities = [];
    }
    onMessage(msg){
        if(msg.to === 'parser' && msg.from === 'controls' && msg.data.action ==='run'){
            document.dispatchEvent(addMessage(new Message(
                'collision',
                'parser',
                {entities:this.entities.flat(),msg}
            )));
        }else if(msg.to === 'parser' && msg.from === 'collider'){
            let{results,candidates,direction} = msg.data;
            if(results.length === 0){
                candidates.forEach(entity=>{
                    document.dispatchEvent(addMessage(new Message(entity.id,'parser',direction)));
                })
            }
            else if(!msg.data.results.map(entity=>entity.STOP).every(trait=>trait === undefined)){
                document.dispatchEvent(addMessage(new Message('controls','parser','finished')));
                return;
            }
            else{
                [...candidates,...results].forEach(entity=>{
                    document.dispatchEvent(addMessage(new Message(entity.id,'parser',direction)));
                })
            }
            document.dispatchEvent(addMessage(new Message('controls','parser','finished')));
        }
    }
    purge(){
        this.entities = [];
    }

}