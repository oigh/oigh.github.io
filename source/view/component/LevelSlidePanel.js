import { SlideContainer } from "./SlideContainer.js";
import { LevelCard } from "./LevelCard.js";
import { getResourceManager } from "../../Game.js";

export class LevelSlidePanel extends PIXI.Container {
    constructor() {
        super();

        this.pageWidth = 2000;
        this.pageHeight = 4000;

        this.background = new PIXI.Graphics()
            .beginFill(0x000000, 0.4)
            .drawRoundedRect(-this.pageWidth / 2, -this.pageHeight / 2, this.pageWidth, this.pageHeight, 0)
            .endFill();
        this.addChild(this.background);

        const slideContainer = new SlideContainer(1600, 1600, 400, 0x000000, 1);
        this.addChild(slideContainer);
        slideContainer.position.set(-800, -800);

        const dataTable = getResourceManager().getTable('level');

        const levelArray = Array.from(dataTable);

        for (let i = 0; i < levelArray.length; i++) {
            const item = new LevelCard();
            item.setLevel(levelArray[i][1]);
            item.on('clickWithoutMove', () => {
                this.emit('levelSelect', levelArray[i][1]);
            });
            slideContainer.addChild(item);
        }

        this.frame = new PIXI.Graphics()
            .lineStyle(5, 0xFFFFFF, 0.1)
            .drawRect(-1000, -800, 2000, 1600);

        this.addChild(this.frame);

        this.background.eventMode = 'static';
        this.background.on('pointerup', this.onBackgroundClick.bind(this));
    }

    onBackgroundClick() {
        this.eventMode = 'none';
        this.alpha = 0;
    }
}