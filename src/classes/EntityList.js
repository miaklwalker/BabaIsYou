import chooseStrategy from "./Stratagies/EntityList.Strategies.js";


export default class EntityList {
    constructor(game, strategy) {
        this.strategy = chooseStrategy(strategy);
        this.entities = [];
        this.divisions = game.gridDiminsions;
        this.frameCount = 0;
        this.frameLength = 3;
        this.frameRate = 15
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
                    x * canvas.width / this.divisions,
                    y * canvas.height / this.divisions, image
                )
            });
        this.frameCount++
    }
}