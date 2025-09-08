import { LevelSlidePanel } from "./LevelSlidePanel.js";
import { TextButton } from "./TextButton.js";

export class TopPanel extends PIXI.Container {
    constructor() {
        super();

        this.mapButton = new TextButton();
        this.mapButton.position.set(-800, 0);
        this.mapButton.titleText.text = '地图';

        this.addChild(this.mapButton);

        this.setButton = new TextButton();
        this.setButton.position.set(800, 0);
        this.setButton.titleText.text = '设置';
        this.setButton.on('pointerup', () => { });
        this.addChild(this.setButton);
    }
}