import chooseStrategy from "./Stratagies/EntityList.Strategies.js";


export default class EntityList {
    constructor(game, strategy) {
        this.strategy = chooseStrategy(strategy);
        this.entities = [];
        this._divisions = game;
        this.frameCount = 0;
        this.frameLength = 3;
        this.frameRate = 5
    }
    get divisions(){
        return this._divisions.gridDiminsions
    }
    get frame(){
        return Math.floor(this.frameCount / this.frameRate % this.frameLength);
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    render = (canvas, context, image, spriteSheets, tint) => {
        this.entities
            .map(entity => entity.draw())
            .forEach((entity) => {
                let [x,y] = entity;
                let sprite = this.strategy(spriteSheets,entity,this.frame,this);
                sprite.render(
                    canvas, context,
                    tint,
                    x * canvas.width / this.divisions[0],
                    y * canvas.height / this.divisions[1], image
                )
            });
        this.frameCount++
    }
}