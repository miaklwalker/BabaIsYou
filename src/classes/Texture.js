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


function buildTexturePack(x,y){

}
buildTexturePack(648,1200);


export default class Texture {
    consructor(x,y){
        this.x = x;
        this.y = y;
        this.tiles = new Map();
    }
    render(canvas,context,tile){
       return this.tiles.get(tile);

    }
    initialize(img) {
        /*

        "Brick":{
        x:648,
        y:1500,
        tiles:{
        right:{
         0:{
         x:this.x + n,
         y:this.y + n + offSetY
         w:24,
         h:24,
         },
         1:{
         x:this.x + n,
         y:this.y + n + offSetY
         w:24,
         h:24,
         },
         2:{
         x:this.x + n,
         y:this.y + n + offSetY
         w:24,
         h:24,
         }
        }
        }
        }
        */

    }
}