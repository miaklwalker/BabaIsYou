import Test from "../testLibrary/modules/Test.js";
import {describe} from "../testLibrary/modules/TestRunner.js";
import Block from "../src/classes/Block.js";
import Vector from "../src/classes/Vector.js";
import expect from "../testLibrary/modules/Expect.js";


let test = Test(()=>{
    describe('Block Class',()=>{
        const block = new Block(1,1);
        expect(block).toBeInstanceOf(Block)
        expect(block.position).toBeInstanceOf(Vector)
        expect(block.draw()).toMatchArray([1,1])

    })
});
export default test