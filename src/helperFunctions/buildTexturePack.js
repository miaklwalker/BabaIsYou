let tiles = [
    "single",
    "left",
    "bottom",
    "bottomLeft",
    "Right",
    "right",
    "middle",
    "bottomRight",
    "middleJoint",
    "top",
    "topLeft",
    "verticalMiddle",
    "verticalMiddleRight",
    "topRight",
    "middleDown",
    "verticalMiddleLeft",
    "fourWay"
];



export default function buildTexturePack(x,y){
    let result = {};
    for(let i = 0 ; i < tiles.length ; i++){
        result[tiles[i]] = [];
        for(let j = 0 ; j < 3  ; j++){
            result[tiles[i]].push({
                x:x + (i * 24),
                y:y + (j * 24),
                width:24,
                height:24
            })
        }
    }
    return result;
}