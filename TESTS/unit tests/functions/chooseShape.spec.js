import {describe,expect,test,jest} from "@jest/globals";
import chooseShape from "../../../src/helperFunctions/chooseShape.js";

let arrs = [
    [false ,false ,false ,false],
    [true  ,false ,false ,false],
    [false ,true  ,false ,false],
    [false ,false ,true  ,true ],
    [false ,false ,true ,false ],
    [true  ,false ,true  ,false],
    [true  ,false ,false ,true ],
    [true  ,false ,true  ,true ],
    [false ,false ,false ,true ],
    [false ,true  ,true  ,false],
    [false ,true  ,false ,true ],
    [false ,true  ,true  ,true ],
    [true  ,true  ,false ,false],
    [true  ,true  ,true  ,false],
    [true  ,true  ,false ,true ],
    [true  ,true  ,true  ,true ]
];
let result=[
    'single',
    'right',
    'top',
    'bottomLeft',
    'left',
    'middle',
    'bottomRight',
    'middleJoint',
    'bottom',
    'topLeft',
    'verticalMiddle',
    'verticalMiddleRight',
    'topRight',
    'middleDown',
    'verticalMiddleLeft',
    'fourWay'

];
    describe(`Choose Shape`,()=> {
        test('Should Choose the correct Shape',()=>{
            expect(chooseShape(arrs[0])).toBe(result[0]);
            expect(chooseShape(arrs[1])).toBe(result[1]);
            expect(chooseShape(arrs[2])).toBe(result[2]);
            expect(chooseShape(arrs[3])).toBe(result[3]);
            expect(chooseShape(arrs[4])).toBe(result[4]);
            expect(chooseShape(arrs[5])).toBe(result[5]);
            expect(chooseShape(arrs[6])).toBe(result[6]);
            expect(chooseShape(arrs[7])).toBe(result[7]);
            expect(chooseShape(arrs[8])).toBe(result[8]);
            expect(chooseShape(arrs[9])).toBe(result[9]);
            expect(chooseShape(arrs[10])).toBe(result[10]);
            expect(chooseShape(arrs[11])).toBe(result[11]);
            expect(chooseShape(arrs[12])).toBe(result[12]);
            expect(chooseShape(arrs[13])).toBe(result[13]);
            expect(chooseShape(arrs[14])).toBe(result[14]);
            expect(chooseShape(arrs[15])).toBe(result[15]);
        })
    });

