import {describe,expect,test,jest} from "@jest/globals";
import addMessage from "../../../src/CustomEvents/addmessage.js";

describe('Add Message',()=>{
    let message = addMessage('Test');
    test('addMessage should make a custom event',()=>{
        expect(message).toEqual(expect.any(CustomEvent));
    });
    test('Should pass the have the specified message',()=>{
        expect(message.detail).toBe('Test');
    })
});