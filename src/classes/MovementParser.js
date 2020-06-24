import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";

export default class MovementParser{
    constructor(){
        this.entities = [];
    }
    parseFromControls(msg){
        this.sendMessage(
            'collision',
            'parser',
            {entities:this.entities.flat(),msg}
        );
    }
    handleNoCollisions(candidates,direction){
        candidates.forEach(entity=>{
            let id = entity.id;
            this.sendMessage(id, 'parser', {direction})
            }
        )
    }
    sendMessage(to,from,message){
        document.dispatchEvent(
            addMessage(
                new Message(
                    to,
                    from,
                    message
                )
            )
        )
    }
    handleStop(){
        this.sendMessage(
            'controls',
            'parser',
            'finished'
        )
    }
    handleMessageFromCollider(msg){
        let{results,candidates,direction} = msg.data;
        // No Collisions.
        if(results.length === 0){
            this.handleNoCollisions(candidates,direction);
        }
        else if (results[0].canTouch){
            let entity = results[0];
            let id = entity.id;
            this.sendMessage(id,'parser', {direction,msg});
            this.handleNoCollisions(candidates,direction);
        }
        else if(results.map(entity=>entity.strictCollide).some(trait=>trait)){
            this.handleStop();
            return;
        }
        else{
            this.notifyAll([...candidates,...results],direction,msg)
        }
        this.handleStop();
    }
    notifyAll(recipients,direction,msg){
        recipients.forEach(entity=>{
            this.sendMessage(entity.id, 'parser',
                {direction, msg})
        })
    }
    onMessage(msg){
        if(msg.to === 'parser' && msg.from === 'controls' && msg.data.action ==='run'){
            this.parseFromControls(msg);
        }else if(msg.to === 'parser' && msg.from === 'collider') {
            this.handleMessageFromCollider(msg);
        }
    }
    purge(){
        this.entities = [];
    }
    removeEntity(targetId){
        this.entities =  this.entities.filter( entity => entity.id === targetId.id);
    }
}
