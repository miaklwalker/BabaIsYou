import Block from "../Block.js";

export default class PropertyBlock extends Block{
    constructor(x,y,name) {
        super(x,y,name,'properties');
        this.strategy = 'WORD';
        this.group ='words';
    }

}