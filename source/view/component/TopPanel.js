import { TextButton } from "./TextButton.js";

export class TopPanel extends PIXI.Container {
    constructor() {
        super();

        this.mapButton = new TextButton();
        this.mapButton.position.set(-800, 0);
        this.mapButton.titleText.text = '地图';
        this.mapButton.on('click', () => { });
        this.addChild(this.mapButton);

        this.setButton = new TextButton();
        this.setButton.position.set(800, 0);
        this.setButton.titleText.text = '设置';
        this.setButton.on('click', () => { });
        this.addChild(this.setButton);

        this.createTitleLabel();
    }

    createTitleLabel() {
        this.titleText = new PIXI.Text('', {
            ...PIXI.Text.defaultStyle,
            fontSize: 50,
        });
        this.titleText.anchor.set(0.5);
        this.titleText.position.set(0, 0);
        this.addChild(this.titleText);
    }
}