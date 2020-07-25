import Block from "../Block.js";

export default class OperatorBlock extends Block{
    constructor(x,y,name) {
        super(x,y,name,'operators');
        this.strategy = 'WORD';
        // noinspection JSUnusedGlobalSymbols
        this.group ='words';
    }

}