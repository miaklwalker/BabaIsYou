let tiles = [
    "single",
    "left",
    "bottom",
    "bottomLeft",
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



export default function buildTexturePack(x,y,scaleX = 0 ,scaleY = 0){
    let result = {};
    for(let i = 0 ; i < tiles.length ; i++){
        result[tiles[i]] = [];
        for(let j = 0 ; j < 3  ; j++){
            result[tiles[i]].push({
                x:x + (i * 24) - scaleX,
                y:y + (j * 24) + scaleY/2 ,
                width: 24 + scaleX,
                height:24 - scaleY
            })
        }
    }
    return result;
}