import {describe,expect,test,jest} from "@jest/globals";
import chooseShape from "../../../src/helperFunctions/chooseShape.js";

let testData = [
    [[false ,false ,false ,false] ,'single'],
    [[true  ,false ,false ,false] , 'right'],
    [[false ,true  ,false ,false] , 'top' ],
    [[false ,false ,true  ,true ] , 'bottomLeft'],
    [[false ,false ,true ,false ] , 'left'],
    [[true  ,false ,true  ,false] , 'middle'],
    [[true  ,false ,false ,true ] , 'bottomRight'],
    [[true  ,false ,true  ,true ] , 'middleJoint'],
    [[false ,false ,false ,true ] , 'bottom'],
    [[false ,true  ,true  ,false] , 'topLeft'],
    [[false ,true  ,false ,true ] , 'verticalMiddle'],
    [[false ,true  ,true  ,true ] , 'verticalMiddleRight'],
    [[true  ,true  ,false ,false] , 'topRight'],
    [[true  ,true  ,true  ,false] , 'middleDown'],
    [[true  ,true  ,false ,true ] , 'verticalMiddleLeft'],
    [[true  ,true  ,true  ,true ] , 'fourWay']
];

    describe(`Choose Shape`,()=> {
        test.each(testData)('When Given %p expect to receive %p',(input,expected)=>{
            expect(chooseShape(input)).toBe(expected);
        })
    });

