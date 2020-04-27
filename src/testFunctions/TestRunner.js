import {FailLog, Log, passLog} from "./expectFactory.js";
import tests from "./function.test.js";
export default function runTest(logLevel=0){
    if(logLevel>2||typeof logLevel !== 'number')return'Please only put a number 0 - 2';
    let testNumber = 0;
    let passed = [];
    let failed = [];
    tests.forEach(test=>{
        if(logLevel === 0){
            if(!test){
                return false;
            }
        }else if( logLevel === 1){
            if(test===true){
                passed.push(testNumber);
            }else{
                failed.push(testNumber);
            }
            testNumber++
        }else{
            if(test===true){
                passLog(`Test ${testNumber} Passed`,'Green');
                testNumber++
            }else{
                FailLog(`Test ${testNumber} Failed`,'Red');
                Log(`Expected`,'Green');
                Log(JSON.stringify(test.expected),'Green');
                Log(`Received`,'Red');
                Log(JSON.stringify(test.received),'Red');
                testNumber++
            }
        }
    });
    return{passed,failed};
}