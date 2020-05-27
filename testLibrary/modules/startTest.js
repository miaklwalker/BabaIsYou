import testRunner from "./TestRunner.js";

async function loadTests(configURL) {
    let testJSON = await fetch(configURL)
    let tests = await testJSON.json();
    return tests.tests;
}

export default function startTestRunner(configURL, logLevel) {
    try {
        loadTests(configURL).then(results => {
            Promise.all(results.map(test => import(test))).then(specs => {
                specs.forEach(spec => {
                    spec.default()
                })
            }).then(() => {
                testRunner.runTests(logLevel);
            })
        })
    }catch{
        console.log('No tests were specified');
    }
}