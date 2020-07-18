import chooseClass from "../helperFunctions/ChooseStrategy.js";
import blockFactory from "../helperFunctions/blockFactory.js";
import makeUniqueId from "../helperFunctions/MakeID.js";


export default class Entity {
    constructor(block){
        this.block = block;
        this.isWord = false;

        this.isTopLevel = false;
        this.isForeground = false;

        this.isBackground = false;
        this.isRendered = true;

        this.useMessage = true;
        this.useCollision = true;

        this.useRules = true;
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
        if(this.block.id){
            return this.block.id;
        }else{
         let id = makeUniqueId(12);
         this.block.id = id;
         return id;
        }
    }
    onMessage(message){
        this.block.onMessage(message);
    }
    get strategy(){
        return this.block.strategy;
    }
};

