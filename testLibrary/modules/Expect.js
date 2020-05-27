import mapObjToString from "./mapObjectToString.js";
import {tests} from "./Globals.js";

/**
 * @class Expect
 * @property received - The value received ;
 * @property isObject - When expect is created it checks if received is a object;
 * @property _not - A private property that is only directly set with .not it negates any matchers and makes them return true when they fail;
 * @property result - A object with two properties Message and Pass property;
 */
class Expect {
    constructor(received) {
        this.received = received;
        this.isObject = typeof this.received === 'object';
        this._not = false;
        this.result = {
            message:'',
            pass:null,
        }
    }
    pass(expected,received = this.received){
        this.result = {
            message :  !this._not ? 'Passed' : {expected, received} ,
            passed  :  !this._not
        };
        tests.push(this.result);
        return this;
    }
    fail(expected,received = this.received){
        this.result = {
            message : this._not ? 'Passed' : {expected, received},
            passed  : this._not
        };
        tests.push(this.result);
        return this;
    }
    /**
     *
     * @description Matches anything but null and undefined;
     */
    anything(){
        return this.received !== undefined && this.received !== null ? this.pass('to Be Null') : this.fail('To Not be null or undefined');
    };
    /**
     * @description Matches anything that was created with the given constructor;
     * @param expected
     * @returns {Expect}
     */
    any(expected){
        return typeof this.received === typeof expected() ? this.pass(expected) : this.fail(expected);
    };
    /**
     *@description Matches a received array which contains all of the elements in the expected array.
     */
    arrayContaining(expected){
        if(Array.isArray(expected)){
            return expected.map(member=>{
                return this.received.includes(member)
            }).includes(false) ? this.fail() : this.pass();
        }else{
            return this.received.includes(expected) ? this.fail(expected) : this.pass(expected);
        }
    };
    /**
     * @description Not negates the current matchers and returns its opposite;
     */
    get not(){
        this._not = true;
        return this
    };
    /**
     * @description Compares primative values or checks refrenctial id , calls object.is under the hood;
     */
    toBe(expected){
        return  Object.is(expected, this.received) ? this.pass(expected) : this.fail(expected);
    };
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
                return this.pass(expected)
            }
        }else{
            return Object.is(this.received,expected) ? this.pass(expected) : this.fail(expected);
        }
    };
    toHaveReturned(expected){
        if(Object.is(expected,this.received())){
            return this.pass(expected,this.received());
        }
        return this.fail(expected,this.received());
    };
    toMatchArray(expected){
        if (this.received.length === expected.length) {
            let temp = this.received.map((member, index) => member === expected[index]);
            if (!temp.includes(false)) {
                return this.pass(expected);
            } else {
                return this.fail(expected);
            }

        }
        return this.fail(expected);
    };
    toHaveLength(expected){
        return this.received.length === expected ? this.pass(expected): this.fail(`To have length ${expected}`,this.received.length);
    }
    toHaveProperty(expected){
        return Object.keys(mapObjToString(this.received)).includes(expected) ? this.pass(expected) : this.fail(expected);
    };
    toHavePropertyWithValue(expected, value) {
        let hasProperty = this.toHaveProperty(expected).result.passed;
        let hasValue = mapObjToString(this.received)[expected] === value;
        return ( hasProperty && hasValue ) ? this.pass(expected) : this.fail(expected);
    };
    toBeFalsy(){
        return this.received ? this.fail('Expected a falsey value') : this.pass(' ');
    };
    toBeDefined(){
        return this.received !== undefined ? this.pass() : this.fail();
    }
    toBeGreaterThan(expected){
        return (this.received > expected) ? this.pass(expected) : this.fail(expected);
    };
    toBeGreaterThanOrEqual(expected){
        return (this.received >= expected)? this.pass(expected) : this.fail(expected);
    };
    toBeLessThan(expected){
        return (this.received < expected)? this.pass(expected) : this.fail(expected);
    };
    toBeLessThanOrEqual(expected){
        return (this.received <= expected)? this.pass(expected) : this.fail(expected);
    };
    toBeInstanceOf(expected){
        return (this.received instanceof expected)? this.pass(expected) : this.fail(expected);
    };
    toBeNull() {
        return (this.received === null)? this.pass('null',`${this.received}`) : this.fail('null',`${this.received}`);
    };
    toBeTruthy() {
        return !(!this.received)? this.pass() : this.fail();
    };
    toBeUndefined() {
        return (this.received === undefined)? this.pass('expected to not be undefined') : this.fail('expected undefined');
    };
    toBeNaN () {
        return isNaN(this.received) ? this.pass('expected not to be NaN') : this.fail('Expected NaN');
    };
    toHaveBeenCalled(){
        return this.received.mock.calls.length > 0 ? this.pass() : this.fail() ;
    }
    toHaveBeenCalledTimes(expected){
        return this.received.mock.calls.length === expected ? this.pass() : this.fail() ;
    }
    toHaveBeenCalledWith(...args){
        let calls = this.received.mock.calls;
        let passes = false;
        if(args.length === 1){
            calls.forEach(call=>{
                call.forEach(arg=>{
                    if(expect(arg).toBe(args[0])){passes = true}
                })
            })
        }else{
            calls.forEach(call=>{
                if(expect(call).toMatchArray(args)){passes = true}
            })
        }
        return passes ? this.pass() : this.fail();
    }
    toHaveBeenLastCalledWith(...args){
        return expect(this.received.mock.calls[this.received.mock.calls.length-1]).toMatchArray(args);
    }
    toHaveBeenNthCalledWith(nth,...args){
        return expect(this.received.mock.calls[nth-1]).toMatchArray(args) ? this.pass() : this.fail();
    }
    toHaveReturnedTimes(expected){
        return this.received.mock.results.length === expected ? this.pass(expected) : this.fail(expected);
    }
    toHaveLastReturned(expected){
        return expect(this.received.mock.results[this.received.mock.calls.length-1].value).toBe(expected) ? this.pass(expected) : this.fail(expected);
    }
    toHaveNthReturnWith(nth,args){
        return expect(this.received.mock.results[nth-1].value).toBe(args);
    }
    toContain(expected){
        if(Array.isArray(expected)){
            return this.received.includes(expected) ? this.pass(expected) : this.fail(expected);
        }else if(typeof expected === 'set'){
            console.log('set');
        }
    }
    toContainEqual(expected){
        let passes = true;
        let message;
        function checkObject(received){
            for(let key in received){
                if(received.hasOwnProperty(key)) {
                    if (received[key] === Object) {
                        return checkObject(received[key])
                    }
                    if (expected[key] === undefined) {
                        passes = false;
                        message = `Object with ${key}, When expected has no such key`;
                    }
                    if (expected[key] !== received[key]) {
                        passes = false;
                        message = `${key}:${received[key]} does not match expected ${JSON.stringify(expected)}`;
                    }
                }
            }
        }
        if(this.received instanceof Object && expected instanceof Object){
            checkObject(this.received);
            return passes ? this.pass(message) : this.fail(message)
        }
    }
    toBeCloseTo(expected,numDigits=1){
        const precise = ( x ) => Number.parseFloat(x).toPrecision(numDigits);
        return precise(this.received) === precise(expected) ? this.pass(expected):this.fail(expected);
    }
    static extend (matcher){
        for(let key in matcher){
            Expect.prototype[key] = matcher[key];
        }

    }
}

/**
 *
 * @param received
 * @returns {Expect}
 * @description The expect function used to test a value, Passing it a value will return matchers.
 * You can use these matchers to test function and verify results
 */
function expect (received){
    return new Expect(received);
}

expect = new Proxy(expect,{
    apply(target,thisArg,args){
        return target.apply(thisArg,args);
    },
    get(target,prop){
        if(prop === 'extend'){
            return Expect.extend
        }
        return Expect[prop];
    },
    set(){

    }
});

export default expect;