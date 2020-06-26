import Entity from "./Entity.js";

export default class masterList{
    constructor(){
        this.entities = new Map();
    }
    addEntiity(id,entity){
        this.entities.set(id,new Entity(entity));
    }
    removeEntity(id){
        this.entities.delete(id)
    }
    changeEntity(id,name){
        let entity =this.entities.get(id);
        entity.changeBlockType(name);
        this.entities.set(id,entity);
    }
    getEntity(id){
        return this.entities.get(id);
    }
    blockLoop(callBack){
        let blocks = this.entities.forEach(([key,value])=>{
            callBack(key,value);
        })
    }
    get Blocks(){
        let temp = [];
        this.entities.forEach(([key,value])=>{
            temp.push(value);
        });
        return temp;
    }
}