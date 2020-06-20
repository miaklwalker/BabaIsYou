import {describe,expect,test,jest} from "@jest/globals";
import Layer from "../../../src/classes/Layer.js";

describe('Layer',()=>{
    test('Should have properties',()=>{
        let test = ()=>{}
        let layer = new Layer(1,test,[1,2,3,4]);
        expect(layer.priority).toBe(1);
        expect(layer.callback).toBe(test);
        expect(layer.args).toEqual(expect.arrayContaining([1,2,3,4]))
    })

});