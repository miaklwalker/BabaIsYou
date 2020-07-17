import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import makeUniqueId from "../helperFunctions/MakeID.js";
import CollisionStack from "./CollisionStack.js";
import parseStack from "../helperFunctions/parseStack.js";

const STOP = "STOP";
const MOVE = "MOVE";
const CHECK = "CHECK";
const FINISH = "FINISH";

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
        // If there is no collision send a
        // message with direction to all candidates
        // for movement
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
        const {results,candidates,direction,overlaps} = msg.data;
        overlaps.forEach(item=>item.overlap = true);
        for(let i = 0 ; i < overlaps.length; i++){
            let candidate = overlaps[i];
            for(let j = 0 ; j < results.length;j++){
                let potential =  results[j];
                if(potential.position.same(candidate.position)){
                    potential.overlap = true;
                }
            }
        }
        for(let i = 0 ; i < results.length ; i++){
            let a = results[i];
            for (let j = 0 ; j < results.length ; j++){
                if(j !== i ){
                    let b = results[j];
                    let overlap = a.position.same(b.position);
                    if(overlap){
                        a.overlap = true;
                        b.overlap = true;
                    }

                }
            }
        }
        if(results.length === 0){
            this.handleNoCollisions(candidates,direction);
        }
        else{
            let collision = new CollisionStack();
            let observables = [...results,...overlaps];
            observables.forEach(item=>collision.add(item));
            collision.sortStack(direction);
            let {command,toMove} = parseStack(collision);
            if(command === STOP){
                this.handleStop();
            }
            else{
                let temp = [...candidates];
                temp.forEach(entity=>{
                    this.sendMessage(entity.id,'parser',{direction,msg},true);
                });
                temp = [];
                for(let i = 0 ; i < toMove ;i++){
                    let entity = observables[i];
                    temp.push(entity);
                }
                this.notifyAll(temp,direction,msg);
            }
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
