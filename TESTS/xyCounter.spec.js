import {describe,expect,test,jest} from "@jest/globals";
import xyCounter from "../src/helperFunctions/xyCounter.js";



    describe('XY Counter',()=>{
        test('Works on each count',()=>{
            let counter = xyCounter(10);
            expect(counter()).toEqual([1,0]);
            expect(counter()).toEqual([2,0]);
            expect(counter()).toEqual([3,0]);
            expect(counter()).toEqual([4,0]);
            expect(counter()).toEqual([5,0]);
            expect(counter()).toEqual([6,0]);
            expect(counter()).toEqual([7,0]);
            expect(counter()).toEqual([8,0]);
            expect(counter()).toEqual([9,0]);
            expect(counter()).toEqual([0,1]);
        })
    })
