import { getPlayerManager } from "../../Game.js";
import { AttributeFormatter } from "../../module/design/AttributeFomatter.js";

export class PlayerPanel extends PIXI.Container {
    constructor() {
        super();

        const p = getPlayerManager().getPlayer();

        const s =
            AttributeFormatter.fl('attack', p.attack, 6) + '  ' +
            AttributeFormatter.fl('speed', p.speed, 6) + '  ' +
            AttributeFormatter.fl('health', p.health, 6) + '  ' +
            AttributeFormatter.fl('defend', p.defend, 6) + '\n\n' +
            AttributeFormatter.fl('cProb', p.cProb, 6) + '  ' +
            AttributeFormatter.fl('cScale', p.cScale, 6) + '  ' +
            AttributeFormatter.fl('miss', p.miss, 6) + '  ' +
            AttributeFormatter.fl('absorb', p.absorb, 6);

        this.contentText = new PIXI.Text(s, {
            ...PIXI.Text.defaultStyle,
            fontSize: 50,
        });

        this.contentText.anchor.set(0.5, 0.5);
        this.contentText.position.set(0, 0);
        this.addChild(this.contentText);

        this.frame = new PIXI.Graphics()
            .lineStyle(5, 0xFFFFFF, 0.1)
            .drawRect(-1000, -200, 2000, 400);

        this.addChild(this.frame);
    }
}