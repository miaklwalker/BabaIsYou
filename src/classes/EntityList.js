export default class EntityList {
    constructor(game) {
        this.entities = [];
        this.divisions = game.gridDiminsions;
        this.frameCount = 0;
        this.frameLength = 3;
    }
    get frame(){
        return Math.floor(this.frameCount / 19 % this.frameLength);
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    render = (canvas, context, image, spriteSheets, tint) => {
        this.entities
            .map(entity => entity.draw())
            .forEach(([x, y, name, group, type]) => {
                let sprite;
                let spritesSheet = spriteSheets.spriteSheets;
                if (group !== undefined) {
                    sprite = spritesSheet[group][type][name].sprites[this.frame]
                } else {
                    sprite = spritesSheet[type][name].sprites[this.frame]
                }

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