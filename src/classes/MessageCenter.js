import makeUniqueId from "../helperFunctions/MakeID.js";
import Entity from "./Entity.js";

export default class MessageCenter{
    constructor(masterList){
        this.messages = [];
        this.queue = [];
        this.recipients = masterList;
        this.sending = false;
        this.psuedoID = makeUniqueId;
    }
    subscribe(...recipient){
        recipient.forEach(listener=>{
            let entity = new Entity(listener);

            entity.useMessage = true;
            entity.useCollision = false;

            let id =  this.psuedoID(12);
            this.recipients.addEntity(id,listener)
        })
    }
    unsubscribe(id){
        this.recipients.changeEntityFlag(id,'useMessages',false);
    }
    handleAddMessage=(event)=>{
        if(this.sending){
            this.queue.push(event.detail)
        }else{
            this.messages.push(event.detail)
        }

    };
    purge(){
        this.queue = [];
        this.messages = [];
    }
    update(){
        this.sending = true;
        this.messages.forEach(message=>{
            this.recipients.forEach(recipient=>{
                if(recipient['useMessage']) {
                    recipient.onMessage(message);
                };
            })
        });
        this.messages = [];
        this.sending = false;
        this.queue.forEach(()=>{
            this.messages.push(this.queue.pop());
        })
    }
}