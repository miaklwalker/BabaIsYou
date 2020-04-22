export default class EntityList{
    constructor(divisions = 15) {
        this.entities = [];
        this.divisions = divisions;
    }
    addEntity(entity){
        this.entities.push(entity);
    }
    render=(canvas,context)=>{
        this.entities.forEach(entity=>entity.draw(canvas,context,this.divisions))
    }
}