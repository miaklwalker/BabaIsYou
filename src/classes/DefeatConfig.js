export default class DefeatConfig {
    constructor(condition,contrary){
        this.condition = condition;
        this.contrary = contrary;
        this.removeSelf = true;
        this.removePlayer = true;
    }

}