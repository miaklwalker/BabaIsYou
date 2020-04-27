export default class EntityList{
    constructor(divisions = 15) {
        this.entities = [];
        this.divisions = divisions;
        this.frameCount = 0;
    }
    addEntity(entity){
        this.entities.push(entity);
    }
    render=(canvas,context,image,spriteSheets,tint)=>{
        let frame = Math.floor(this.frameCount/10 % 3);
         this.entities
             .map(entity=>entity.draw())
             .forEach(([x,y,name,group])=>{
            spriteSheets.words[group][name]['sprites'][frame]
                .render(canvas,context,tint,x,y,image)
        });
        this.frameCount++
    }
}