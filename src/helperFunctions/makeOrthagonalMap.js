import Vector from "../classes/Vector.js";

export default function makeOrthagonalMap(candidate){
    return {
        left : new Vector(-1,0).addVector(candidate.position),
        right: new Vector(1 ,0).addVector(candidate.position),
        up   : new Vector(0,-1).addVector(candidate.position),
        down : new Vector(0 ,1).addVector(candidate.position)
    }
}