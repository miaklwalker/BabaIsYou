export default class Layer {
    constructor(priority,callback,args=[]){
        this.priority = priority;
        this.callback = callback;
        this.args = args;
    }
}