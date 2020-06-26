import chooseClass from "../helperFunctions/ChooseStrategy.js";
import blockFactory from "../helperFunctions/blockFactory.js";


export default class Entity {
    constructor(block,word = false){
        this.block = block;
        this.isWord = word;
        this.useMessage = true;
        this.useCollision = true;
    };
    changeBlockType(name){
        if(!this.isWord) {
            let {x, y} = this.block.position;
            let sprite = [x,y,name];
            let newBlock = chooseClass(name);
            this.block = blockFactory(newBlock,sprite);
        }
    }
    get id (){
        return this.block.id;
    }
    onMessage(message){
        this.block.onMessage(message);
    }
    get strategy(){
        return this.block.strategy;
    }
};

