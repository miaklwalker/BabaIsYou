import Trait from "./Trait.js";
import implementDefeat from "../../helperFunctions/implementDefeat.js";
import DefeatConfig from "../DefeatConfig.js";
//done
export default class Hot extends Trait {
    constructor(){
        super('HOT');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id){
            implementDefeat(message,sprite,new DefeatConfig("MELT"))
        }
    }
}