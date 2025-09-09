import { SlideContainer } from "./SlideContainer.js";
import { WeaponCard } from "./WeaponCard.js";
import { getResourceManager } from "../../Game.js";

export class WeaponSlidePanel extends PIXI.Container {
    constructor(weaponDataPanel) {
        super();

        this.weaponDataPanel = weaponDataPanel;

        const slideContainer = new SlideContainer(2000, 1600, 400, 0x000000, 1);
        this.addChild(slideContainer);
        slideContainer.position.set(-1000, -800);

        const dataTable = getResourceManager().getTable('weapon');

        const weaponArray = Array.from(dataTable);

        for (let i = 0; i < weaponArray.length; i++) {
            const item = new WeaponCard();
            item.setWeapon(weaponArray[i][1]);
            item.on('clickWithoutMove', () => {
                this.weaponDataPanel.setWeapon(weaponArray[i][1]);
                this.weaponDataPanel.eventMode = 'static';
                this.weaponDataPanel.alpha = 1;
            });
            slideContainer.addChild(item);
        }

        this.frame = new PIXI.Graphics()
            .lineStyle(5, 0xFFFFFF, 0.1)
            .drawRect(-1000, -800, 2000, 1600);

        this.addChild(this.frame);
    }
}