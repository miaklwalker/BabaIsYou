import addMessage from "../CustomEvents/addmessage.js";
import Message from "./Message.js";
import makeUniqueId from "../helperFunctions/MakeID.js";

const STOP = "STOP";
const MOVE = "MOVE";
const CHECK = "CHECK";
const FINISH = "FINISH";

/*

A -> C -> T     => MOVE 2
          ^
A -> C -> C     => MOVE 2
          ^
A -> C -> S     => STOP 0
          ^
--------------
A -> S =>       => STOP 0
     ^
--------------
A -> T -> T     => MOVE 1
          ^
A -> T -> C     => MOVE 1
          ^
A -> T -> S     => MOVE 1
          ^
--------------
A -> [T|C]      => MOVE 2
       ^
A -> [T|C] -> S => STOP 0
       ^
--------------


MINIMUM OF 9 CASES;
1 DONE
2 DONE
3 DONE
4 DONE
5 DONE
6 DONE
7 DONE
8
9
 */


class CollisionStack {
    stack;
    count;
    constructor(){
        this.stack = {};
        this.count = 0;
    }
    add(node){
        this.stack[this.count] = node;
        this.count++
    }
    iter(callback){
        for(let i = 0 ; i < this.count; i++){
            callback(this.stack[i],i,this.stack);
        }
    }
    subtract(){
        this.count--;
        const temp = this.stack[this.count];
        delete this.stack[this.count];
        return temp;
    }
    takeFromFront(){
        let index = this.count-1;
        let result = this.stack[0];
        for(let i = 0 ; i < index ; i++){
            this.stack[i] = this.stack[i+1];
        }
        delete this.stack[index];
        this.count --;
        return result;
    }
    map(callback) {
        let temp = [];
        for(let i = 0 ; i < this.count ; i++){
            temp.push(callback(this.stack[i],i,this.stack));
        }
        return temp;
    }
}

function parseStack (collision){

    let command;
    let toMove = 0;

    const S = "Strict";
    const C = "CanCollide";
    const T = "CanTouch";

    let mapTags = collision.map(item=>{
        if(item.strictCollide){
            return S;
        }else if(item.canCollide){
            return C;
        }else {
            return T;
        }
    });

    if(mapTags.length === 0){
        command = MOVE;
    }
    else {
        for (let i = 0; i < mapTags.length; i++) {
            let item = mapTags[i];
            if (item === S) {
                if(command === CHECK){
                    break;
                }else{
                    command = STOP;
                    toMove = 0;
                    break;
                }
            }
            else if (item === T) {
                if (command === undefined) {
                    console.log("UNDEFINED");
                    toMove++;
                    command = CHECK;
                }
                else if (command === CHECK) {
                    console.log("FROM CHECK");
                    toMove++
                    command = MOVE;
                    break;
                }
                else {
                    console.log("FROM ELSE");
                    toMove++;
                    command = CHECK;
                }
            }
            else {
                if(command === CHECK) {
                    break;
                }
                toMove++;
                command = MOVE;
            }
        }
    }

    command = command === CHECK ? MOVE : command;

    return {
        command,
        toMove
    };
}

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
        const {results,candidates,direction,overlaps} = msg.data;
        if(results.length === 0){
            this.handleNoCollisions(candidates,direction);
        }
        else{
            let collision = new CollisionStack();
            let observables = [...results,...overlaps];
            observables.forEach(item=>collision.add(item));
            let {command,toMove} = parseStack(collision);
            console.log(command,toMove);
            if(command === STOP){
                this.handleStop();
            }
            else{
                let temp = [...candidates];
                for(let i = 0 ; i < toMove ;i++){
                    let entity = observables[i];
                    temp.push(entity);
                }
                this.notifyAll(temp,direction,msg);
            }
        }
        this.handleStop();
    }
    handleMessageFromCollider1(msg){
        let{results,candidates,direction,overlaps} = msg.data;
        let collision = new CollisionStack();
        [...results,...overlaps].forEach(item=>collision.add(item));
        let {command,toMove} = parseStack(collision);
        // No Collisions.
        if(results.length === 0){
            this.handleNoCollisions(candidates,direction);
        }
        //Touch
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
            this.notifyAll([...candidates,...results,...overlaps],direction,msg)
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
