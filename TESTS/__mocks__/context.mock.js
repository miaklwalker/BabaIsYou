import {jest} from "@jest/globals";

export default function createContextMock(){
    return {
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
    }
}