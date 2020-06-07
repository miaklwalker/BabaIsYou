import testRunner from "./TestRunner.js";

async function loadTests(configURL) {
    let testJSON = await fetch(configURL);
    let tests = await testJSON.json();
    return tests.tests;
}

export default function startTestRunner(configURL, logLevel) {
    try {
        async function start (){
            let tests = await loadTests(configURL);
            let results = await Promise.all(tests.map(test=>import(test)));
            results.forEach((spec,index)=>{
                spec.default();
            });
        }
        start()
            .then((testNames)=>testRunner.runTests(logLevel,testNames))

    }catch{
        console.log('No tests were specified');
    }
}