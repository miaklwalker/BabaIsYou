import {describe,expect,test,jest} from "@jest/globals";
import makeUniqueId from "../../../src/helperFunctions/MakeID.js";

let testData = [
    ["alphaNumeric", /([a-z0-9]{12})/gi],
    ["alphaNumericLowerCase",/([a-z0-9]{12})/g],
    ["alpha",/([a-z]{12})/gi],
    ["alphaLower",/([a-z]{12})/g],
    ["alphaUpper",/([A-Z]{12})/g],
    [0,/([a-z0-9]{12})/gi],
    [1,/([a-z0-9]{12})/g],
    [2,/([a-z]{12})/gi],
    [3,/([a-z]{12})/g],
    [4,/([A-Z]{12})/g]
];

describe('Make Unique ID',()=>{
    test('outputs the correct length',()=>{
        const id = makeUniqueId(12);
        expect(id).toHaveLength(12);
    });
    test.each(testData)('Given %p expect a id string matching %p',(configString,regMatcher)=>{
        expect(makeUniqueId(12,configString)).toMatch(regMatcher);
    })

});

