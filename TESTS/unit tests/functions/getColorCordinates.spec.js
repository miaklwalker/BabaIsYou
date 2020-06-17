import {describe,expect,test,jest} from "@jest/globals";
import getColorCoords from "../../../src/helperFunctions/getColorCoords.js";



describe('Get Color Coordinates', () => {
    let testData = [
        [[488, 24, 0], [489, 25, 6, 6]],
        [[488, 24, 1], [497, 25, 6, 6]],
        [[488, 24, 6], [537, 25, 6, 6]],
        [[488, 24, 7], [489, 33, 6, 6]],
        [[488, 24, 14],[489, 41, 6, 6]],
        [[488, 24, 21],[489, 49, 6, 6]],
        [[488, 24, 28],[489, 57, 6, 6]],
        [[488, 24, 34],[537, 57, 6, 6]],

    ];

    test.each(testData)('getColorCoords when passed %p should return %p',(input, expected)=>{
        expect(getColorCoords(...input)).toEqual(expect.arrayContaining(expected));
    });
});

