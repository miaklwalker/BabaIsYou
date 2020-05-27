function Log(message,color){
    console.log("%c" + message, "color:" + color);
}

function failLog(message){
    Log(message,'Red');
}

function passLog(message){
    Log(message,'Green');
}

let logger = (didPass) => !didPass ? failLog : passLog;

export function logLevelOne(results,test){
    let pass = true;

    console.groupCollapsed("%c" + `Test: ${test}`, "color:" + '#fefefe')
    results[test].forEach((result,index)=>{
        if(!result.passed){
            pass = false;
        }
        logger(result.passed)(`
        Test: ${index}
        Passed: ${result.passed}
        ${JSON.stringify(result.message)}
        `)
    });
    console.groupEnd()
    logger(pass)(` :: ${pass ? 'Passed' : 'Failed'} :: `)
}

export function logLevelTwo(results,test){
    Log(`${test}`,'#fefefe');
    let pass = true;
    results[test].forEach(result=>{
        if(!result.passed){
            pass = false;
        }
    });

    logger(pass)(` :: ${pass ? 'Passed' : 'Failed'} :: `);
}

export function logLevelThree(results,test){
    let passed = [];
    let failed = [];
    Log(`${test}`,'#fefefe');
    results[test].forEach(result=>{
        if(result.passed){
            passed.push(result);
        }else{
            failed.push(result)
        }
    })
    if(failed.length === 0 ){
        passLog(` :: Passed :: `);
    }else{
        failLog(`:: Failed :: `);
        failed.forEach(result=>{
            failLog('expected')
            failLog(result.message.expected)
            failLog('received')
            failLog(result.message.received)
        })
    }
}