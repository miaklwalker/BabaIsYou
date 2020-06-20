import {describe, expect, test, jest, beforeEach, beforeAll} from "@jest/globals";
import Renderer from "../../../src/classes/Renderer.js";
import Layer from "../../../src/classes/Layer.js";
import Sprite from "../../../src/classes/Sprite.js";
import loadImage from "../../../src/asyncLoaders/loadImage.js";
import loadJSON from "../../../src/asyncLoaders/loadJSON.js";

describe('Renderer',()=>{
    let renderer;
    let game;

    beforeEach(()=>{
        game = {
            gridDiminsions:[20,20]
        };
        renderer = new Renderer(game)
    });
    test('Renderer Should have Properties',()=>{
        expect(renderer.layers).toHaveLength(0);
        expect(renderer.palette).toEqual(expect.arrayContaining([488,24,56,40]));
        expect(renderer.texture).toBeNull();
        expect(renderer._divisions).toEqual(game);
    });
    test('Getter Method " divisions "',()=>{
        expect(renderer.divisions).toEqual(expect.arrayContaining([20,20]));
    });
    test('Add Layer should add new Layers to the layers array',()=>{
        renderer.sortLayer = jest.fn(renderer.sortLayer);
        renderer.addLayer(new Layer(1,()=>{},[1,2,3]));
        renderer.addLayer(new Layer(1,()=>{},[1,2,3]));
        expect(renderer.layers).toHaveLength(2);
        expect(renderer.sortLayer).toHaveBeenCalled();
    });
    test(`Render Should call a Layer's Callback function with an args array`,()=>{
        let mockRender = jest.fn();
        renderer.addLayer(new Layer(1,mockRender,[1,2,3]));
        renderer.addLayer(new Layer(1,mockRender,[1,2,3]));
        let canvas = {};
        let context = {};
        renderer.render(canvas,context);
        expect(mockRender).toBeCalledTimes(2);
        expect(mockRender).toHaveBeenCalledWith(canvas,context,1,2,3);
    });
    test(`Render shouldn't render a layer with a priority of zero`,()=>{
        let mockRender = jest.fn();
        let layer = new Layer(0,mockRender);
        renderer.addLayer(layer);
        renderer.render('canvas','context');
        expect(mockRender).not.toHaveBeenCalled();
    });
    test(`Sort Layer should sort the layers by priority`,()=>{
        let layer1 = {priority:5};
        let layer2 = {priority:3};
        let layer3 = {priority:4};
        renderer.addLayer(layer1);
        renderer.addLayer(layer2);
        renderer.addLayer(layer3);
        expect(renderer.layers).toEqual([layer2,layer3,layer1])
    });

    test('The Tint Method',()=>{
        // Setting up the canvas for the test;
        let canvas = document.createElement('canvas');
        let img = document.createElement('img');
        img.src = '../../../images/spritesheet.png';
        canvas.width = 24;
        canvas.height = 24;
        let context = {
            drawImage:jest.fn(),
            clearRect:jest.fn(),
            getImageData:jest.fn(),
            putImageData:jest.fn(),
            globalCompositeOperation:'',
            imageData:{
                data:[
                    22,22,22,22,
                    2,2,2,2,
                    76,76,76,76,
                    0,0,0,0
                ]
            }
        };
        context.getImageData.mockReturnValue({
            data:[1,1,1,1]
        });
        context.getImageData.mockReturnValue(context.imageData);
        let sprite = [0,0,24,24];
        renderer.tint(canvas,context,sprite,img,25);
        expect(context.drawImage).toHaveBeenCalledTimes(3 )
        expect(context.getImageData).toHaveBeenCalledTimes(2);
        expect(context.clearRect).toHaveBeenCalledTimes(1);
        expect(context.putImageData).toHaveBeenCalledTimes(1);
        expect(context.globalCompositeOperation).toBe('destination-in')
        expect(context.imageData.data).toEqual(expect.arrayContaining(
            [
                1.8980392156862744,
                1.8980392156862744,
                1.8980392156862744,
                22,
                0.17254901960784313,
                0.17254901960784313,
                0.17254901960784313,
                22,
                6.556862745098039,
                6.556862745098039,
                6.556862745098039,
                22,
                0,
                0,
                0,
                22,
            ]))

    })

});