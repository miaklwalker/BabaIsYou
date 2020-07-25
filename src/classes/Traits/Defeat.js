import Trait from "./Trait.js";
import defeat from "../../helperFunctions/implementDefeat.js";
import DefeatConfig from "../DefeatConfig.js";
//done
export default class Defeat extends Trait {
    constructor(){
        super('DEFEAT');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id ){
            let config = new DefeatConfig("YOU",undefined);
            config.removeSelf = false;
            defeat(message,sprite,config);
        }
    }
}