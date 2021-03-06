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
    map(callback) {
        let temp = [];
        for(let i = 0 ; i < this.count ; i++){
            temp.push(callback(this.stack[i],i,this.stack));
        }
        return temp;
    }
    sortStack(dir){
        let values = Object.values(this.stack);
        values
            .sort(sorts[dir])
            .forEach((value,i)=>this.stack[i]=value);
    }
}

const sorts = {
    left,
    down,
    right,
    up,
};

function right (a,b){
    let x1 = a.position.x;
    let x2 = b.position.x;

    if(x1>x2){
        return 1;
    }else if(x1<x2){
        return -1;
    }else{
        return 0;
    }

}
function left (a,b){
    let x1 = a.position.x;
    let x2 = b.position.x;

    if(x1>x2){
        return -1;
    }else if(x1<x2){
        return 1;
    }else{
        return 0;
    }

}
function down (a,b){
    let y1 = a.position.y;
    let y2 = b.position.y;

    if(y1>y2){
        return 1;
    }else if(y1<y2){
        return -1;
    }else{
        return 0;
    }

}
function up (a,b){
    let y1 = a.position.y;
    let y2 = b.position.y;

    if(y1>y2){
        return -1;
    }else if(y1<y2){
        return 1;
    }else{
        return 0;
    }

}