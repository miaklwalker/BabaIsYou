import Entity from "./Entity.js";

export default class masterList{
    constructor(){
        this.entities = new Map();
        this.buffer = new Map();
    }
    addEntity(id, entity){
        this.entities.set(id,new Entity(entity));
        this.invalidateBuffer();
    }
    removeEntity(id){
        this.entities.delete(id);
        this.invalidateBuffer();
    }
    changeEntity(id,name){
        let entity = this.entities.get(id);
        entity.changeBlockType(name);
        this.entities.set(id,entity);
        this.invalidateBuffer();
    }
    changeEntityFlag(id,flag,value){
        let updatedEntity = this.entities.get(id);
        updatedEntity[flag] = value;
        this.invalidateBuffer();
    }
    invalidateBuffer(){
        this.buffer = new Map();
    }

    purge(){
        this.entities = new Map();
        this.buffer = new Map();
    }
    forEach(callBack){
         this.entities.forEach(callBack)
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
        let flagTest = flags.join();
        if(this.buffer.has(flagTest)){
            return this.buffer.get(flagTest);
        }else{
            let entities = this.filter(entity=>{
                let chosen = false;
                flags.forEach(flag=>{
                    if(entity[flag] === true){
                        chosen = true;
                    }
                });
                return chosen;
            });
            let mapped = entities.map(entity=>entity.block);
            this.buffer.set(flagTest,mapped);
            return mapped;
        }
    }
    get Blocks(){
        if(this.buffer.has("blocks")){
            return this.buffer.get("blocks")
        }else{
            let temp = [];
            this.entities.forEach((key)=>{
                temp.push(key);
            });
            this.buffer.set("blocks",temp);
            return temp;
        }
    }
}