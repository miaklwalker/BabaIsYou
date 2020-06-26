import makeUniqueId from "../helperFunctions/MakeID.js";

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
            this.recipients.addEntity(this.psuedoID(12),listener)
        })
    }
    unsubscribe(id){
       // this.recipients =  this.recipients.removeEntity(id);
    }
    handleAddMessage=(event)=>{
        if(this.sending){
            this.queue.push(event.detail)
        }else{
            this.messages.push(event.detail)
        }

    };
    purge(){
        this.recipients = [];
        this.queue = [];
        this.messages = [];
    }
    update(){
        this.sending = true;
        this.messages.forEach(message=>{
            this.recipients.Blocks.forEach(recipient=>{
                recipient.onMessage(message);
            })
        });
        this.messages = [];
        this.sending = false;
        this.queue.forEach(()=>{
            this.messages.push(this.queue.pop());
        })
    }
}