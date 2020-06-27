import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import makeUniqueId from "../helperFunctions/MakeID.js";
import Entity from "./Entity.js";

export default class MovementParser{
    constructor(masterList){
        this.masterList = masterList;
        this.entities = masterList.Blocks;
    }
    parseFromControls(msg){
        let blocksWithCollision = this.masterList
            .filter(entity=>{
           return entity.useCollision;
            })
            .map(entity=>{
                return entity.block
            });
        this.sendMessage(
            'collision',
            'parser',
            {entities:blocksWithCollision,msg}
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
        console.log(msg);
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
            console.log('General Collision');
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
    addEntity(entity){
        if(this.masterList.has(entity.id)){
            this.masterList.changeEntityFlag(entity.id,'useCollision',true);
        }else{
            let id = makeUniqueId(12);
            let wrappedEntity = new Entity(entity);
            this.masterList.addEntity(wrappedEntity);
        }
    }
    removeEntity(targetId){
        this.masterList.changeEntityFlag(targetId,'useCollision',false)
    }
}
