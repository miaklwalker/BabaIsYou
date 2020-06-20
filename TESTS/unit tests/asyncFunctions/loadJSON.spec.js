import {describe,expect,test,jest} from "@jest/globals";
import loadJSON from "../../../src/asyncLoaders/loadJSON.js";

describe('Load JSON',()=>{
    test('Should Call A Request with a url then return the resulting promise',()=>{
        const mockFetch = jest.fn(()=>{
            return new Promise(res =>{
                let data = {
                    foo:1,
                    bar:2,

                };
                let response = {
                    data:JSON.stringify(data),
                    json:jest.fn(()=>JSON.parse(JSON.stringify(data)))
                };
                res(response);
            })
        });
        let testData = loadJSON('../testUrl.json',mockFetch);
        expect(mockFetch).toHaveBeenCalled();
        return expect(testData).resolves.toEqual({bar:2,foo:1})
    })
});