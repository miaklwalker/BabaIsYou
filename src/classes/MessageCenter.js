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

            let id =  this.psuedoID(12);
            this.recipients.addEntity(id,listener);

            this.recipients.changeEntityFlag(id,'isRendered',false);
            this.recipients.changeEntityFlag(id,'useRules',false);
            this.recipients.changeEntityFlag(id,'useCollision',false);
            this.recipients.changeEntityFlag(id,'useRender',false);

        })
    }
    unsubscribe(id){
        this.recipients.changeEntityFlag(id,'useMessages',false);
    }
    handleAddMessage=(event)=>{
        if(this.sending){
            this.queue.push(event.detail)
        }else{
            if(!event.detail["priority"]) {
                this.messages.push(event.detail)
            }else{
                this.messages.unshift(event.detail)
            }
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
                }
            })
        });
        this.messages = [];
        this.sending = false;
        this.queue.forEach(()=>{
            this.messages.push(this.queue.pop());
        })
    }
}