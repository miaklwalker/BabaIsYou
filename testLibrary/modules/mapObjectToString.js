export default function mapObjToString(obj,result = {},parentKey=undefined){
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result[key] = true;
                mapObjToString(obj[key], result, key);
            } else {
                if(parentKey !== undefined ) {
                    result[`${parentKey}.${key}`] = obj[key];
                }else{
                    result[`${key}`] = obj[key];
                }
            }
        }
    }
    return result
}
