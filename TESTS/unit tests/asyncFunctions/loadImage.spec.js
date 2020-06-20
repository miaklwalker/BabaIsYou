import {describe,expect,test} from "@jest/globals";
import loadImage from "../../../src/asyncLoaders/loadImage.js";

describe('Load Image',()=>{
    let image;
    test('Load image should take a url and return a HTMLImageElement',()=>{
        image = loadImage('../../../images/spritesheet.png');
        expect(image).resolves.toEqual(expect.any(HTMLImageElement));
    })
});