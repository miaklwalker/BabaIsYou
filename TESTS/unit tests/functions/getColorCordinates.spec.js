import {describe,expect,test,jest} from "@jest/globals";
import getColorCoords from "../../../src/helperFunctions/getColorCoords.js";



describe('Get Color Coordinates', () => {
    let inputs = [
        [488, 24, 0],
        [488, 24, 1],
        [488, 24, 6],
        [488, 24, 7],
        [488, 24, 14],
        [488, 24, 21],
        [488, 24, 28],
        [488, 24, 34]

    ];
    let outputs = [
        [489, 25, 6, 6],
        [497, 25, 6, 6],
        [537, 25, 6, 6],
        [489, 33, 6, 6],
        [489, 41, 6, 6],
        [489, 49, 6, 6],
        [489, 57, 6, 6],
        [537, 57, 6, 6]


    ];
    test('Should Return the correct array', () => {
        let mockColorCord = jest.fn(getColorCoords);
        inputs.forEach(([x, y, tint], index) => {
            mockColorCord(x, y, tint);
            expect(mockColorCord).toHaveReturnedWith(outputs[index]);
        })
    })
})

