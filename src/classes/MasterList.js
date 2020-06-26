import Entity from "./Entity.js";

export default class masterList{
    constructor(){
        this.entities = new Map();
    }
    addEntity(id, entity){
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
    changeEntityFlag(id,flag,value){
        let updatedEntity = this.entities.get(id)[flag] = value;
        this.entities.set(id,updatedEntity);
    }
    getEntity(id){
        return this.entities.get(id);
    }
    forEach(callBack){
         this.entities.forEach((key,value)=>{
            callBack(key,value);
         })
    }
    get Blocks(){
        let temp = [];
        this.entities.forEach((key)=>{
            temp.push(key);
        });
        return temp;
    }
}