import {results, tests} from "./Globals.js";
import {logLevelOne, logLevelThree, logLevelTwo} from "./Logger.js";



class TestRunner{
    constructor(){
        this.suites = [];
    }
    runTests(logLevel){
        this.suites.forEach(suite=>{
            suite();
        });

        for(let test in results ){
            switch(logLevel){
                case 1 :
                    logLevelOne(results,test);
                    break;
                case 2 :
                    logLevelTwo(results,test);
                    break;
                default:
                    logLevelThree(results,test);
            }
        }
    }
    describe=(description,callback)=>{
        let temp = []
        this.suites.push(()=>{
            callback();
            tests.forEach(test=>temp.push(test));
            results[description] = temp;
            tests.splice(0,tests.length);
        })
    };
}

const testRunner = new TestRunner();
export default testRunner;
export let describe = testRunner.describe;
