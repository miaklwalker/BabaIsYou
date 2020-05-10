import ___tests___ from './Globals.js';

function Log(message,color){
    console.log("%c" + message, "color:" + color);
}

function FailLog(message){
    Log(message,'Red');
}

function passLog(message){
    Log(message,'Green');
}

export default function testRunner(logLevel = 0){
    if(logLevel>2||typeof logLevel !== 'number')return'Please only put a number 0 - 2';
    let testResults = {}
    for(let tests in ___tests___){
        let suiteName =  tests;
        let testSuite = ___tests___[tests];
        let passes = true;
        let messages = []
        testSuite.forEach((test,index)=>{
            if(test.result.passed){
                 messages.push([test.result.passed,` ${index} ${test.result.message}`])
            }else{
                passes = false;
                messages.push([test.result.passed,`Test ${index} Failed ${JSON.stringify(test.result.message)}`])
            }
        })
        if(passes === true){
            console.log(`${suiteName} :: Passed ::`)
        }else{
            console.log(`${suiteName} :: Failed ::`)
            messages.forEach(([passed,message])=>{if(!passed){console.log(message)}})
        }
        testResults[suiteName] 
    }
    return testResults;
}


// export function runTest(logLevel=0){

//     let testNumber = 0;
//     let passed = [];
//     let failed = [];
//     ___test___.forEach(({test,description})=>{
//         if(logLevel === 0){
//             if(!test){
//                 return false;
//             }
//         }else if( logLevel === 1){
//             if(test===true){
//                 passed.push(testNumber);
//             }else{
//                 failed.push(testNumber);
//             }
//             testNumber++
//         }else{
//             if(test===true){
//                 passLog(`${description} Passed`,'Green');
//                 testNumber++
//             }else{
//                 FailLog(`Test ${description} Failed`,'Red');
//                 Log(`Expected`,'Green');
//                 Log(test.expected,'Green');
//                 Log(`Received`,'Red');
//                 Log(test.received,'Red');
//                 testNumber++
//             }
//         }
//     });
//     return{passed,failed};
// }