function mapObjToString(obj,result = {},parentKey=undefined){
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
class Expect {
    received;
    isObject;
    constructor(received) {
        this.received = received;
        this.isObject = typeof this.received === 'object';
        this._not = false;
    }
    pass(expected){
        return !this._not ? true : {expected,received:this.received};
    }
    fail(expected){
        return this._not ? true : {expected,received:this.received};
    }
    toEqual(expected){
        if(this.isObject){
            let e = mapObjToString(expected);
            let r = mapObjToString(this.received);
            let keyLength = (obj) => Object.keys(obj).length;
            if(keyLength(e)===keyLength(r)){
                for(let key in expected){
                    if(e[key] !== r[key]){
                        return this.fail(expected);
                    }
                }
                return this.pass()
            }
        }else{
            return Object.is(this.received,expected);
        }
    };
    toBe(expected){
        return  Object.is(expected, this.received) ? this.pass() : this.fail(expected);
    };
    toHaveReturned(expected){
        if(expect(this.received()).toBe(expected)){
            return this.pass();
        }
        return this.fail(expected);
    };
    toMatchArray(expected){
        if (this.received.length === expected.length) {
            let temp = this.received.map((member, index) => member === expected[index]);
            if (!temp.includes(false)) {
                return this.pass();
            } else {
                return this.fail(expected);
            }

        }
        return false;
    };
    anything(){
        return this.received !== undefined && this.received !== null ? this.pass() : this.fail('To Not be null or undefined');
    };
    arrayContaining(){};
    any(expected){};
    get not(){
        this._not = true;
        return this
    };
    toHaveLength(expected){
        return this.received.length === expected ? this.pass(): this.fail(`To have length ${expected}`);
    }
    toHaveProperty(expected){
        return Object.keys(mapObjToString(this.received)).includes(expected) ? this.pass() : this.fail(expected);
    };
    toHavePropertyWithValue(expected, value) {
        return (this.toHaveProperty(expected) && mapObjToString(this.received)[expected] === value) ?this.pass() : this.fail();
    };
    toBeFalsey(){
        return this.received ? this.fail() : this.pass();
    };
    toBeGreaterThan(expected){
        return (this.received > expected) ? this.pass() : this.fail();
    };
    toBeGreaterThanOrEqual(expected){
        return (this.received >= expected)? this.pass() : this.fail();
    };
    toBeLessThan(expected){
        return (this.received < expected)? this.pass() : this.fail();
    };
    toBeLessThanOrEqual(expected){
        return (this.received <= expected)? this.pass() : this.fail();
    };
    toBeInstanceOf(expected){
        return (this.received instanceof expected)? this.pass() : this.fail();
    };
    toBeNull() {
        return (this.received == null)? this.pass() : this.fail();
    };
    toBeTruthy() {
        return !(!this.received)? this.pass() : this.fail();
    };
    toBeUndefined() {
        return (this.received == undefined)? this.pass() : this.fail();
    };
    toBeNaN () {
        if (
            this.toBeFalsey()
            && this.received !== undefined
            && this.received !== null
            && typeof this.received !== 'boolean'
            && typeof this.received !== 'string'
            && this.received !== 0
            && this.received !== false
        ) {
            return this.pass()
        }
        return this.fail();
    };
    toHaveBeenCalled(){}
    toHaveBeenCalledTimes(){}
    toHaveBeenCalledWith(){}
    toHaveBeenLastCalledWith(){}
    toHaveBeenNthCalledWith(){}
    toHaveReturnedTimes(){}
    toHaveLastReturned(){}
    toHaveNthReturnWith(){}
    toContain(){}
    toContainEqual(){}
    tomatch(){}
    toMatchObject(){}
    toStrictlyEqual(){}
    toThrow(){}
}

export default function expect (received){
    return new Expect(received);
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