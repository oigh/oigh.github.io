import { getPageManager } from "../../Game.js";
import { TextButton } from "./TextButton.js";

export class BottomPanel extends PIXI.Container {
    constructor() {
        super();

        this.weaponButton = new TextButton();
        this.weaponButton.position.set(0, 0);
        this.weaponButton.titleText.text = '武器';
        this.weaponButton.on('pointerup', () => {
            getPageManager().switchTo("start").then();
        });
        this.addChild(this.weaponButton);
    }
}