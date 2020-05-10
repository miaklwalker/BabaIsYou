
import ___tests___ from './Globals.js';


function testRunner(logLevel){
    console.log('ran')
    let testResults = {}
    let testNumber = 0
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


export function describe(description,...tests){
    ___tests___[description] = tests;
}
export function it(description,test){
    describe(description,test);
}
export function should(description,test){
    describe(description,test);
}

