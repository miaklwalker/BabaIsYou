import chooseClass from "./ChooseStrategy.js";
import blockFactory from "./blockFactory.js";


export default class Entity {
    constructor(block,word = false){
        this.block = block;
        this.isWord = word;
    };
    changeBlockType(name){
        if(!this.isWord) {
            let {x, y} = this.block.position;
            let sprite = [x,y,name];
            let newBlock = chooseClass(name);
            this.block = blockFactory(newBlock,sprite)
        }
    }
    get strategy(){
        return this.block.strategy;
    }
};

