import {describe, expect, test, jest, beforeEach} from "@jest/globals";
import Renderer from "../../../src/classes/Renderer.js";
import Layer from "../../../src/classes/Layer.js";

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
    test.todo('test the tint method');



});