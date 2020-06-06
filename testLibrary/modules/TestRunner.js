import {results, tests} from "./Globals.js";
import {logLevelOne, logLevelThree, logLevelTwo} from "./Logger.js";



class TestRunner{
    constructor(){
        this.suites = [];
    }
    runTests(logLevel,testName){
        this.suites.forEach(suite=>{
            suite();
        });
        let index = 0;
        console.log(testName);
        for(let test in results ){
            index++;
            switch(logLevel){
                case 1 :
                    logLevelOne(results,test,testName[index]);
                    break;
                case 3 :
                    logLevelTwo(results,test,testName[index]);
                    break;
                case 2 :
                    logLevelThree(results,test,testName[index]);
                    break;
                default:
                    break;
            }
        }
    }
    describe=(description,callback)=>{
        let temp = [];
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
