import { getArchiveManager } from "../../Game.js";
import { NumberHelper } from "../../helper/NumberHelper.js";

export class CoinPanel extends PIXI.Container {
    constructor() {
        super();

        this.setup();

        const unsubscribeHandle = getArchiveManager().subscribe((gameStatus) => {
            const t = '金币: ' + NumberHelper.fn(gameStatus.props.coin ?? 0, 6) +
                '  红玉: ' + NumberHelper.fn(gameStatus.props.ruby ?? 0, 6);
            this.contentText.text = t;
        });
    }

    setup() {
        this.contentText = new PIXI.Text('', {
            ...PIXI.Text.defaultStyle,
            fontSize: 50,
        });

        this.contentText.anchor.set(0.5, 0.5);
        this.contentText.position.set(0, 0);
        this.addChild(this.contentText);

        this.frame = new PIXI.Graphics()
            .lineStyle(5, 0xFFFFFF, 0.1)
            .drawRect(-1000, -100, 2000, 200);

        this.addChild(this.frame);
    }
}