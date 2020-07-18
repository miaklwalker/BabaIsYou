import Trait from "./Trait.js";
import defeat from "../../helperFunctions/implementDefeat.js";
import DefeatConfig from "../DefeatConfig.js";






export default class Sink extends Trait {
    constructor(){
        super('SINK');
    }
    update(sprite,message) {
        sprite.canTouch = true;
        if(message.to === sprite.id ) {
            console.log("Sink");
            defeat(message, sprite,new DefeatConfig(undefined,"FLOAT"))
        }
    }
}