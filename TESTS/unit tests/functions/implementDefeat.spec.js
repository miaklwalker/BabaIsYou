import {beforeEach, describe, test} from "@jest/globals";

describe('Implement Defeat', () => {
    // parameters
    // message, Sprite, config
    // Config Properties
    // removeSelf, removePlayer, condition, contrary
    // Message
    // Data::MSG::DATA:{candidates,results,overlaps}

    //Act
    let sprite,config,message;
    beforeEach(()=>{
        message = {
            data:{
                direction:"left",
                msg:{
                    data:{
                        candidates:[],
                        results:[],
                        overlaps:[]
                    }
                }
            }
        };
    })



    //Arrange
    //Assert

});