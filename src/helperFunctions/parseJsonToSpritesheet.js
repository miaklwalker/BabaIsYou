import Sprite from "../classes/Sprite.js";

export default function parseJsonToSpriteSheet(obj,current={},name){
    let result = {};
    if(Array.isArray(obj)){
        current[name] = obj.map(sprite=> new Sprite(sprite,current.tint,current.palette));
        return current[name];
    }else if(typeof obj === 'number' || typeof obj === 'string'){
        current[name] = obj;
        return current[name];
    }else{
        for(let key in obj){
            if(obj.hasOwnProperty(key)) {
                result[key] = parseJsonToSpriteSheet(obj[key], result, key);
            }
        }
        return result;
    }
}
