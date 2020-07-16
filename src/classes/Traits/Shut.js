import Trait from "./Trait.js";
import implementDefeat from "../../helperFunctions/implementDefeat.js";
import DefeatConfig from "../DefeatConfig.js";

export default class Shut extends Trait {
    constructor(){
        super('SHUT');
    }
    update(sprite,message) {
        sprite.canCollide = true;
        if(message.to === sprite.id){
            implementDefeat(message,sprite,new DefeatConfig("OPEN"));
        }
    }
}