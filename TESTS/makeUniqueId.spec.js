import {describe,expect,test,jest} from "@jest/globals";
import makeUniqueId from "../src/helperFunctions/MakeID.js";



describe('Make Unique ID',()=>{
    test('outputs the correct length',()=>{
        const id = makeUniqueId(12);
        expect(id).toHaveLength(12);
    })
});

