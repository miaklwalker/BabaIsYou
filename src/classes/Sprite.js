export default class Sprite {
    constructor({x,y,w,h,name},tint){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
        this.tint = tint;
        this.buffer = null;
    }
    render=(canvas, context, tint, x, y, image)=>{
        if(this.buffer === null){
            let buffer = document.createElement('canvas');
            let ctx = buffer.getContext('2d');
            tint(buffer,ctx,[this.x,this.y,this.w,this.h],image,this.tint);
            this.buffer = buffer;
        }
        context.drawImage(this.buffer,x,y);
    }
}
