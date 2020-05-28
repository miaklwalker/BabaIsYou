import Test from "../testLibrary/modules/Test.js";
import xyCounter from "../src/helperFunctions/xyCounter.js";
import {describe} from "../testLibrary/modules/TestRunner.js";
import expect from "../testLibrary/modules/Expect.js";

export default Test(()=>{
    describe('XY Counter',()=>{
        let counter = xyCounter(10);
        expect(counter()).toMatchArray([1,0]);
        expect(counter()).toMatchArray([2,0]);
        expect(counter()).toMatchArray([3,0]);
        expect(counter()).toMatchArray([4,0]);
        expect(counter()).toMatchArray([5,0]);
        expect(counter()).toMatchArray([6,0]);
        expect(counter()).toMatchArray([7,0]);
        expect(counter()).toMatchArray([8,0]);
        expect(counter()).toMatchArray([9,0]);
        expect(counter()).toMatchArray([0,1]);
    })
})