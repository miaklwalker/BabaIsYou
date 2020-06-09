export default function deepClone (object) {
    let clone = {};
    for(let prop in object){
        if(object.hasOwnProperty(prop)){
            let value = object[prop];
            let isArray = Array.isArray(value);
            let isObject = typeof value === 'object';
            let isSet = value instanceof Set;
            let isMap = value instanceof Map;

            if(!isArray && !isObject && !isSet && !isMap){
                clone[prop] = value
            }else if(!isArray && isObject && !isSet && !isMap){
                clone[prop] = deepClone(value);
            }else if(isArray){
                let temp = [];
                value.forEach(value=>temp.push(value));
                clone[prop] = temp;
            }else if(isSet){
                let temp = new Set();
                value.forEach(value=>{
                    temp.add(value);
                });
                clone[prop] = temp;
            }else if (isMap){
                let temp = new Map();
                for(let [key,val] of value){
                    temp.set(key,val);
                }
                clone[prop] = temp;
            }else{
                clone[prop] = value;
            }
        }
    }
    return clone;
}