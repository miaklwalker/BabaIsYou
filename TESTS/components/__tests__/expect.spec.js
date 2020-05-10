import expect from "../Expect.js";
import Mock from '../Mock.js';
import {describe} from '../Describe.js';


function add (a, b) {
    return a + b ;
}

function sayHi() {
    return 'Hi'
}

class A {}

function myBeverages(){
    return {delicious: true, sour: false}
}
const myBeverage = {delicious: true, sour: false};


describe('Add Function Should add two numbers together',
expect(add(2,2)).toEqual(4),
expect(add(2,2)).toBe(4)
)
describe('sayHi should return a string that says hi',
expect(sayHi).toHaveReturned('Hi')
)
describe('expect all matchers to work',
expect([4,4]).toMatchArray([4,4]),
expect(4).anything(),
expect([1,2,3,4,5]).arrayContaining([1,2,3]),
expect(add(3,3)).any(Number),
expect(add(2,2)).not.toBe(5),
expect([1,2,3]).toHaveLength(3),
expect({a:0}).toHaveProperty('a'),
expect({a:0}).toHavePropertyWithValue('a', 0),
expect('').toBeFalsy(),
expect(add(2,2)).toBeDefined(),
expect(add(2,2)).toBeGreaterThan(3),
expect(add(2,2)).toBeGreaterThanOrEqual(4),
expect(add(2,2)).toBeLessThan(5),
expect(add(2,2)).toBeLessThanOrEqual(4),
expect(new A).toBeInstanceOf(A),
expect(null).toBeNull(),
expect('Could Be True').toBeTruthy(),
expect(undefined).toBeUndefined(),
expect(NaN).toBeNaN (),
expect(['lime','coconut','orange']).toContain('lime'),
expect(myBeverages()).toContainEqual(myBeverage)
)
class B {}
describe('ALL Should fail',
expect(add(2,2)).not.toEqual(5),
expect(add(2,2)).not.toBe(5),
expect(sayHi).not.toHaveReturned('Hi!'),
expect([4,4]).not.toMatchArray([4,3,4]),
expect(null).not.anything(),
expect([1,2,3,4,5]).not.arrayContaining([1,2,3,7]),
expect(add(3,3)).not.any(String),
expect(add(2,2)).toBe(4),
expect([1,2,3]).not.toHaveLength(4),
expect({a:0}).not.toHaveProperty('b'),
expect({a:0}).not.toHavePropertyWithValue('a', 1),
expect('Fail').not.toBeFalsy(),
expect().not.toBeDefined(),
expect(add(2,2)).not.toBeGreaterThan(5),
expect(add(2,2)).not.toBeGreaterThanOrEqual(5),
expect(add(2,2)).not.toBeLessThan(3),
expect(add(2,2)).not.toBeLessThanOrEqual(3),
expect(new A).not.toBeInstanceOf(B),
expect(undefined).not.toBeNull(),
expect('').not.toBeTruthy(),
expect('hello world').not.toBeUndefined(),
expect(null).not.toBeNaN(),
expect(['lime','coconut','orange']).not.toContain('banana'),
expect(myBeverages()).not.toContainEqual({apple:0})
)




