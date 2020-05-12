import Block from "../Block.js";

function chooseShape({left,right,up,down}){
    let name = 'single' ;
    if(right)name = 'left';
    if(up)name='bottom';
    if(down)name='top';
    if(left)name='right';
    if(right&&up)name='bottomLeft';
    if(left&&right)name='middle';
    if(left&&up)name='bottomRight';
    if(left&&down)name='topLeft';
    if(up&&down)name='verticalMiddle';
    if(left&&down)name='topRight';
    if(up&&left&&right)name='middleJoint';
    if(up&&down&&right)name='verticalMiddleRight';
    if(left&&down&&right)name='middleDown';
    if(up&&down&&left)name='verticalMiddleLeft';
    if(left&&right&&up&&down)name='fourWay';
    return name
}


export default class Wall extends Block{
    constructor(x,y) {
        super(x,y);
        this.type = 'wall';
        this.name = '';
        this.ran = false;
    }
    draw(others){
        this.chooseName(others);
        return [...super.draw(),this.name,undefined,this.type]
    }
    chooseName(neighbors){
        if(this.ran === false) {
            neighbors.forEach(other => {
                let result = this.checkNeighbors(other);
                if(result.includes(true)){
                    const [left,down,right,up]=result;
                    if(left) this.neighbors.left = true;
                    if(right)this.neighbors.right = true;
                    if(up)   this.neighbors.up = true;
                    if(down) this.neighbors.down = true;
                }
            });
        }
        this.ran = true;
        this.name = chooseShape(this.neighbors);
    }
}