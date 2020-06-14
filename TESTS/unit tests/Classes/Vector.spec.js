import {describe, expect, test, jest, beforeEach, it} from "@jest/globals";
import Vector from "../../../src/classes/Vector.js";

describe('Vector',()=>{
    let vector;
    beforeEach(()=>{
        vector = new Vector(0,0);
    })
    test('Vector should have an X and Y value',()=>{

        expect([vector.x,vector.y]).toEqual(expect.arrayContaining([0,0]));
    })
    describe('Should Add either a scalar or the X component from a vector', ()=> {
        let otherVector = new Vector(1,2);
        let scalar = 1;
        test(`Add a Vector's X to vector`,()=>{
            vector.addX(otherVector);
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(0);
        })
        test(`Add a scalar to vector`,()=>{
            vector.addX(scalar);
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(0);
        })
    });
    describe('Should Add either a scalar or the Y component from a vector', ()=> {
        let otherVector = new Vector(1,2);
        let scalar = 1;
        test(`Add a Vector's Y to vector`,()=>{
            vector.addY(otherVector);
            expect(vector.x).toBe(0);
            expect(vector.y).toBe(2);
        })
        test(`Add a scalar to vector`,()=>{
            vector.addY(scalar);
            expect(vector.x).toBe(0);
            expect(vector.y).toBe(1);
        })
    });
    describe('Should Add Two Vectors together', ()=> {
        let otherVector = new Vector(1,2);
        test(`Add Vector `,()=>{
            vector.addVector(otherVector);
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(2);
        })
    });
    describe('Should Subtract either a scalar or the X component from a vector', ()=> {
        let otherVector = new Vector(-1,2);
        let scalar = -1;
        test(`Subtract a Vector's X from vector`,()=>{
            vector.subX(otherVector);
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(0);
        })
        test(`Subtract a scalar from vector`,()=>{
            vector.subX(scalar);
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(0);
        })
    });
    describe('Should Subtract either a scalar or the Y component from a vector', ()=> {
        let otherVector = new Vector(1,-2);
        let scalar = -1;
        test(`Subtract a Vector's Y from vector`,()=>{
            vector.subY(otherVector);
            expect(vector.x).toBe(0);
            expect(vector.y).toBe(2);
        })
        test(`Subtract a scalar from vector`,()=>{
            vector.subY(scalar);
            expect(vector.x).toBe(0);
            expect(vector.y).toBe(1);
        })
    });
    describe('Should Sub One Vector from another', ()=> {
        let otherVector = new Vector(-1,-2);
        test(`Subtract Vector `,()=>{
            vector.subVector(otherVector);
            expect(vector.x).toBe(1);
            expect(vector.y).toBe(2);
        })
    });
    describe('Vector Division',()=>{
        describe('divX should divide a vector',()=>{
            it('can be a scalar',()=>{
                let scalar = 2
                vector.addX(12);
                vector.divX(scalar);
                expect(vector.x).toBe(6);

            });
            it('can be a Vector',()=>{
                let otherVector = new Vector(12,0);
                vector.addX(144);
                vector.divX(otherVector);
                expect(vector.x).toBe(12);
            })
        })
        describe('divY should divide a vector',()=>{
            it('can be a scalar',()=>{
                let scalar = 2
                vector.addY(12);
                vector.divY(scalar);
                expect(vector.y).toBe(6);

            });
            it('can be a Vector',()=>{
                let otherVector = new Vector(0,12);
                vector.addY(144);
                vector.divY(otherVector);
                expect(vector.y).toBe(12);
            })
        })
        describe('divVector should divide a vector',()=>{
            it('can be a scalar',()=>{
                let scalar = 2
                vector.addVector(12);
                vector.divVector(scalar);
                expect(vector.x).toBe(6);

            });
            it('can be a Vector',()=>{
                let otherVector = new Vector(12,12);
                vector.addVector(144);
                vector.divVector(otherVector);
                expect(vector.x).toBe(12);
            })
        })
    })
    test.todo('DivY')
    test.todo('DivVector')
    test.todo('MultX')
    test.todo('MultY')
    test.todo('MultVector')
    test.todo('Same')
});