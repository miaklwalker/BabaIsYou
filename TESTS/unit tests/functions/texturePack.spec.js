import {describe,expect,test,jest} from "@jest/globals";
import buildTexturePack from "../../../src/helperFunctions/buildTexturePack.js";

    describe('Make texture pack',()=>{
        test('Single',()=>{
            expect(buildTexturePack(384,1512,0,0).single[0])
                .toEqual({x:384,y:1512,width:24,height:24});
                expect(buildTexturePack(384,1512,0,9).single[0])
                    .toEqual({x:384,y:1516.5,width:24,height:15});
                expect(buildTexturePack(384,1512,12,12).single[0])
                    .toEqual({x:390,y:1518,width:12,height:12});
        })

    });


