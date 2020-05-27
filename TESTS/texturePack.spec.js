import Test from "../testLibrary/modules/Test.js";
import buildTexturePack from "../src/helperFunctions/buildTexturePack.js";
import {describe} from "../testLibrary/modules/TestRunner.js";
import expect from "../testLibrary/modules/Expect.js";

let test = Test(()=>{
    describe('Make texture pack',()=>{
        expect(buildTexturePack(384,1512,0,0).single[0])
            .toEqual({x:384,y:1512,width:24,height:24}),
        expect(buildTexturePack(384,1512,0,9).single[0])
             .toEqual({x:384,y:1516.5,width:24,height:15}),
        expect(buildTexturePack(384,1512,12,12).single[0])
             .toEqual({x:390,y:1518,width:12,height:12})
    })
});

export default test;