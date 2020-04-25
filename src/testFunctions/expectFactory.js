export default function expect (received){
    return {
        toEqual:(expected)=> received === expected,
        toBe:(expected)=>received === expected,
        toHaveReturned:(expected)=>expect(received()).toBe(expected),
        toMatchArray:(expected)=>{

            if(received.length === expected.length){
                let temp = received.map((member, index)=> member === expected[index]);
                if(!temp.includes(false)){
                    return true
                }else{
                    return {expected,received}
                }

            }
            return false;
        }
    };
}

export function Log(message,color){
    console.log("%c" + message, "color:" + color);
}

export function passLog(message){
    Log(message,'Green');
}

export function FailLog(message){
    Log(message,'Red');
}