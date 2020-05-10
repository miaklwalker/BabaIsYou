import keys from './globals.js'
const MOCK = keys.MOCK;

const Mock = {
    fn(func){
        let spy = new Proxy(func,{
            mock: {
                calls: [],
                nextValue: [],
                results:[]
            },
            get(target,prop){
                if(prop === MOCK || prop === 'mock' ){
                    return this.mock;
                }else{
                    return this.target;
                }
                },
            apply(target,thisArg,args){
                if(this.mock.nextValue.length === 0){
                    let product = target.apply(thisArg,args);
                    this.mock.calls.push([...args]);
                    this.mock.results.push({value:product});
                    return product;
                }else{
                    this.mock.calls.push([...args]);
                    return this.mock.nextValue.pop();
                }
            }
        });
        this.func = spy;
        return spy;
    },
    mockReturnValueOnce(value){
        if(this.func !== undefined) {
            this.func[MOCK].nextValue.push(value);
            return this;
        }
    }
};

export default Mock