export default class MessageCenter{
    constructor(){
        this.messages = [];
        this.queue = [];
        this.recipients = [];
        this.sending = false;
    }
    subscribe(...recipient){
        this.recipients.push(...recipient);
    }
    unsubscribe(id){
        this.recipients =  this.recipients.filter(recipient=>recipient.id !== id);
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
            this.recipients.forEach(recipient=>{
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