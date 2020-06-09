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
            let modules = await Promise.all(tests.map(test=>import(test)));
            modules.forEach(spec=>{
                spec.default();
            });
        }
        start()
            .then((testNames)=>testRunner.runTests(logLevel,testNames))

    }catch{
        console.log('No tests were specified');
    }
}