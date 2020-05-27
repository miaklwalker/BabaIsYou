import Test from "../testLibrary/modules/Test.js";
import {describe} from "../testLibrary/modules/TestRunner.js";
import getColorCoords from "../src/helperFunctions/getColorCoords.js";
import expect from "../testLibrary/modules/Expect.js";

let test = Test(()=> {
        describe('Get Color Coordinates', () => {
            expect(getColorCoords(488, 24, 0)).toMatchArray([488, 24, 8, 8])
            expect(getColorCoords(488, 24, 1)).toMatchArray([496, 24, 8, 8])
            expect(getColorCoords(488, 24, 6)).toMatchArray([536, 24, 8, 8])
            expect(getColorCoords(488, 24, 7)).toMatchArray([488, 32, 8, 8])
            expect(getColorCoords(488, 24, 14)).toMatchArray([488, 40, 8, 8])
            expect(getColorCoords(488, 24, 21)).toMatchArray([488, 48, 8, 8])
            expect(getColorCoords(488, 24, 28)).toMatchArray([488, 56, 8, 8])
            expect(getColorCoords(488, 24, 34)).toMatchArray([536, 56, 8, 8])
        })
    }
)
export default test