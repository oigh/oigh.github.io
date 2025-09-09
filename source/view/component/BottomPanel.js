import { getPageManager } from "../../Game.js";
import { TextButton } from "./TextButton.js";

export class BottomPanel extends PIXI.Container {
    constructor() {
        super();

        this.weaponButton = new TextButton();
        this.weaponButton.position.set(0, 0);
        this.weaponButton.titleText.text = '武器';
        this.addChild(this.weaponButton);

        this.mapButton = new TextButton();
        this.mapButton.position.set(-800, 0);
        this.mapButton.titleText.text = '关卡';
        this.addChild(this.mapButton);
    }
}