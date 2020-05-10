
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

function expect (received){
    return new Expect(received);
}

expect = new Proxy(expect,{
    apply(target,thisArg,args){
        return target.apply(thisArg,args);
    },
    get(target,prop){
        if(prop === 'extend'){
            console.log('ran');
            return Expect.extend
        }
       return Expect[prop];
    },
    set(){

    }
});

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
            message :  !this._not ? 'Passed' : {expected,received} ,
            passed  :  !this._not ? true : false 
        }
        return this;
    }
    fail(expected,received = this.received){
        this.result = {
            message :this._not ? 'Passed' : {expected,received},
            passed  :this._not ? true : false
        }
        return this;
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
                return this.pass(expected)
            }
        }else{
            return Object.is(this.received,expected) ? this.pass(expected) : this.fail(expected);
        }
    };
    toBe(expected){
        return  Object.is(expected, this.received) ? this.pass(expected) : this.fail(expected);
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
    anything(){
        return this.received !== undefined && this.received !== null ? this.pass('to Be Null') : this.fail('To Not be null or undefined');
    };
    arrayContaining(expected){
        if(Array.isArray(expected)){
            return expected.map(member=>{
                return this.received.includes(member)
            }).includes(false) ? this.fail() : this.pass();
        }else{
            return this.received.includes(expected) ? this.fail(expected) : this.pass(expected);
        }
    };
    any(expected){
        return typeof this.received === typeof expected() ? this.pass(expected) : this.fail(expected);
    };
    get not(){
        this._not = true;
        return this
    };
    toHaveLength(expected){
        return this.received.length === expected ? this.pass(expected): this.fail(`To have length ${expected}`);
    }
    toHaveProperty(expected){
        return Object.keys(mapObjToString(this.received)).includes(expected) ? this.pass(expected) : this.fail(expected);
    };
    toHavePropertyWithValue(expected, value) {
        return (this.toHaveProperty(expected) && mapObjToString(this.received)[expected] === value) ?this.pass(expected) : this.fail(expected);
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
        return (this.received == undefined)? this.pass('expected to not be undefined') : this.fail('expected undefined');
    };
    toBeNaN () {
        if (
            this.toBeFalsy()
            && this.received !== undefined
            && this.received !== null
            && typeof this.received !== 'boolean'
            && typeof this.received !== 'string'
            && this.received !== 0
            && this.received !== false
        ) {
            return this.pass('Expected to not be NaN')
        }
        return this.fail('Expected to be NaN');
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
        return expect(this.received.mock.calls[this.received.mock.calls.length-1]).toBe(expected) ? this.pass(expected) : this.fail(expected);
    }
    toHaveNthReturnWith(nth,args){
        return expect(this.received.mock.results[nth-1].value).toBe(args);
    }
    toContain(expected){
        return this.received.includes(expected) ? this.pass(expected) : this.fail(expected);
    }
    toContainEqual(expected){
        let passes = true
        let message;
        function checkObject(received){
            for(let key in received){
                if(received[key] === Object){
                    return checkObject(received[key])
                }
                if(expected[key] === undefined){
                    passes = false;
                    message = `Object with ${key}, When expected has no such key`;
                }
                if(expected[key]!== received[key]){
                    passes = false;
                    message = `${key}:${received[key]} does not match expected ${JSON.stringify(expected)}`;
                }
            }
        }
        if(this.received instanceof Object && expected instanceof Object){
            checkObject(this.received)
            return passes ? this.pass(message) : this.fail(message)
        }
    }
    toMatchObject(){

    }
    toStrictlyEqual(){

    }
    toThrow(){

    }
    toBeCloseTo(expected,numDigits){
        const precise = ( x ) => Number.parseFloat(x).toPrecision(numDigits);
        return precise(this.received) === precise(expected) ? this.pass(expected):this.fail(expected);
    }
    static extend = (matcher)=>{
        for(let key in matcher){
            Expect.prototype[key] = matcher[key];
        }

    }
}

export default expect;