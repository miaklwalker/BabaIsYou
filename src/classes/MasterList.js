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
        let updatedEntity = this.entities.get(id)
        updatedEntity[flag] = value;
    }
    getEntity(id){
        return this.entities.get(id);
    }
    purge(){
        this.entities = new Map();
    }
    forEach(callBack){
         this.entities.forEach((key,value)=>{
            callBack(key,value);
         })
    }
    map(callback){
        let temp = [];
        this.entities.forEach((entity,key)=>{
            temp.push(callback(entity,key))
        });
        return temp;
    }
    filter(callback){
        let temp = [];
        this.entities.forEach((entity,key)=>{
            if(callback(entity,key)){
                temp.push(entity)
            }
        });
        return temp;
    }
    allOfFlags(...flags){
        let entities = this.filter(entity=>{
            let chosen = false;
            flags.forEach(flag=>{
                if(entity[flag] === true){
                   chosen = true;
                }
            });
            return chosen;
        });
        return entities.map(entity=>entity.block);
    }
    get Blocks(){
        let temp = [];
        this.entities.forEach((key)=>{
            temp.push(key);
        });
        return temp;
    }
}