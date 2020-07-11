export default class CollisionStack {
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