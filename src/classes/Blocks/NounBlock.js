import Block from "../Block.js";

export default class NounBlock extends Block{
    constructor(x,y,name) {
        super(x,y,name,'noun');
        this.strategy = 'WORD';
        this.group ='words';
    }
}