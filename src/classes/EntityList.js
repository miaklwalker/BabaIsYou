export default class EntityList {
    constructor(game) {
        this.entities = [];
        this.divisions = game.gridDiminsions;
        this.frameCount = 0;
    }
    addEntity(entity) {
        this.entities.push(entity);
    }
    render = (canvas, context, image, spriteSheets, tint) => {
        let frame = Math.floor(this.frameCount / 10 % 3);
        this.entities
            .map(entity => entity.draw())
            .forEach(([x, y, name, group, type]) => {
                let sprite;
                let spritesSheet = spriteSheets.spriteSheets;
                if (group !== undefined) {
                    sprite = spritesSheet[group][type][name].sprites[frame]
                } else {
                    sprite = spritesSheet[type][name].sprites[frame]
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