import Test from "../testLibrary/modules/Test.js";
import {describe} from "../testLibrary/modules/TestRunner.js";
import expect from "../testLibrary/modules/Expect.js";
import makeUniqueId from "../src/helperFunctions/MakeID.js";


let test = Test(()=>{
    describe('Make Unique ID',()=>{
        const id = makeUniqueId(12);
        expect(id).toHaveLength(12);
    })
});
export default test