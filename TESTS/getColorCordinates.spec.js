import Test from "../testLibrary/modules/Test.js";
import {describe} from "../testLibrary/modules/TestRunner.js";
import getColorCoords from "../src/helperFunctions/getColorCoords.js";
import expect from "../testLibrary/modules/Expect.js";

let test = Test(()=> {
        describe('Get Color Coordinates', () => {
            expect(getColorCoords(488, 24, 0)).toMatchArray([ 489, 25,  6, 6])
            expect(getColorCoords(488, 24, 1)).toMatchArray([ 497, 25,  6, 6])
            expect(getColorCoords(488, 24, 6)).toMatchArray([ 537, 25,  6, 6])
            expect(getColorCoords(488, 24, 7)).toMatchArray([ 489, 33,  6, 6])
            expect(getColorCoords(488, 24, 14)).toMatchArray([489, 41,  6, 6])
            expect(getColorCoords(488, 24, 21)).toMatchArray([489, 49,  6, 6])
            expect(getColorCoords(488, 24, 28)).toMatchArray([489, 57,  6, 6])
            expect(getColorCoords(488, 24, 34)).toMatchArray([537, 57,  6, 6])
        })
    }
)
export default test