export default class Sprite {
    constructor({x,y,w,h,name},tint,palette){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
        this.tint = tint;
        this.palette = palette;
    }
    render=(canvas, context, tint, x, y, image)=>{
        let buffer = document.createElement('canvas');
        let ctx = buffer.getContext('2d');
        tint(buffer,ctx,[this.x,this.y,this.w,this.h],image,this.tint);
        context.drawImage(buffer,x,y);
        return buffer;
    }
}
