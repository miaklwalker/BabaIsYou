export default class MessageCenter{
    constructor(){
        this.messages = [];
        this.recipients = [];
    }
    subscribe(...recipient){
        this.recipients.push(...recipient);
    }
    unsubscribe(id){
        this.recipients =  this.recipients.filter(recipient=>recipient.id !== id);;
    }
    handleAddMessage=(event)=>{
        this.messages.push(event.detail)
    };
    update(){
        this.messages.forEach(message=>{
            this.recipients.forEach(recipient=>{
                recipient.onMessage(message);
            })
        });
        this.messages = [];
    }
}