import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import makeUniqueId from "../helperFunctions/MakeID.js";


export default class MovementParser{
    constructor(masterList){
        this.masterList = masterList;
        this.entities = masterList.Blocks;
    }
    getBlocksWithCollision(){
        return this.masterList.allOfFlags("useCollision");
    }
    parseFromControls(msg){
        let blocksWithCollision = this.getBlocksWithCollision();
        this.sendMessage(
            'collision',
            'parser',
            {entities:blocksWithCollision,msg}
        );
    }
    handleNoCollisions(candidates,direction){
        // If there is no collision send a message with direction to all candidates for movement
        candidates.forEach(entity=>{
            let id = entity.id;
            this.sendMessage(
                id,
                'parser',
                {direction},
                false)
            }
        )
    }
    sendMessage(to,from,message,priority){
        document.dispatchEvent(
            addMessage(
                new Message(
                    to,
                    from,
                    message
                ),
                priority,
            )
        )
    }
    handleStop(){
        // If no blocks need to move the controls should reset allowing another player input
        this.sendMessage(
            'controls',
            'parser',
            'finished'
        )
    }
    handleMessageFromCollider(msg){
        let{results,candidates,direction,overlaps} = msg.data;
        // No Collisions.
        if(results.length === 0){
            this.handleNoCollisions(candidates,direction);
        }
        // Touch
        else if (results[0].canTouch){
            let entity = results[0];
            let id = entity.id;
            this.sendMessage(id,'parser', {direction,msg},false);
            this.notifyAll(overlaps,direction,msg);
            this.handleNoCollisions(candidates,direction);
        }
        // Strict Collide
        else if(results.map(entity=>entity.strictCollide).some(trait=>trait)){
            this.handleStop();
            return;
        }
        // General Collision
        else{
            this.notifyAll([...candidates,...results],direction,msg)
        }
        this.handleStop();
    }
    notifyAll(recipients,direction,msg){
        recipients.forEach(entity=>{
                this.sendMessage(
                    entity.id,
                    'parser',
                    {direction, msg},
                    true
                    )
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
            this.masterList.addEntity(id,entity);
        }
    }
    removeEntity(targetId){
        this.masterList.changeEntityFlag(targetId,'useCollision',false)
    }
}
