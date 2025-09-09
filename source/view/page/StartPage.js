import { BattleStage } from "../component/BattleStage.js";
import { WeaponSlidePanel } from "../component/WeaponSlidePanel.js";
import { PlayerPanel } from "../component/PlayerPanel.js";
import { CoinPanel } from "../component/CoinPanel.js";
import { TopPanel } from "../component/TopPanel.js";
import { BottomPanel } from "../component/BottomPanel.js";
import { LevelSlidePanel } from "../component/LevelSlidePanel.js";
import { getArchiveManager } from "../../Game.js";
import { WeaponDataPanel } from "../component/WeaponDataPanel.js";

export class StartPage extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;

        this.setup();
    }

    setup() {
        const background = new PIXI.Graphics()
            .beginFill(0x111111)
            .drawRect(0, 0, this.app.screen.width, this.app.screen.height)
            .endFill();
        this.addChild(background);

        this.battleStage = new BattleStage(this.app);
        this.battleStage.position.set(1000, 700);
        this.addChild(this.battleStage);

        this.playerPanel = new PlayerPanel(this.app);
        this.playerPanel.position.set(1000, 1600);
        this.addChild(this.playerPanel);

        this.coinPanel = new CoinPanel(this.app);
        this.coinPanel.position.set(1000, 1900);
        this.addChild(this.coinPanel);

        this.topPanel = new TopPanel(this.app);
        this.topPanel.position.set(1000, 200);
        this.addChild(this.topPanel);

        this.bottomPanel = new BottomPanel(this.app);
        this.bottomPanel.position.set(1000, 3800);
        this.addChild(this.bottomPanel);

        this.levelSlidePanel = new LevelSlidePanel(this.app);
        this.levelSlidePanel.position.set(1000, 2800);
        this.addChild(this.levelSlidePanel);

        this.levelSlidePanel.eventMode = 'none';
        this.levelSlidePanel.alpha = 0;

        this.bottomPanel.mapButton.on('pointerup', () => {
            this.levelSlidePanel.eventMode = 'static';
            this.levelSlidePanel.alpha = 1;
            this.weaponSlidePanel.eventMode = 'none';
            this.weaponSlidePanel.alpha = 0;
        });

        this.bottomPanel.weaponButton.on('pointerup', () => {
            this.weaponSlidePanel.eventMode = 'static';
            this.weaponSlidePanel.alpha = 1;
            this.levelSlidePanel.eventMode = 'none';
            this.levelSlidePanel.alpha = 0;
        });

        this.levelSlidePanel.on('levelSelect', (level) => {
            const status = getArchiveManager().LocalGameStatus;
            status.level = level.key;
            getArchiveManager().LocalGameStatus = status;
            this.battleStage.battleContext.loadLevel(getArchiveManager().LocalGameStatus.level, false);
        });
        
        this.weaponDataPanel = new WeaponDataPanel();
        this.weaponDataPanel.position.set(1000, 2000);
        
        this.weaponSlidePanel = new WeaponSlidePanel(this.weaponDataPanel);
        this.weaponSlidePanel.position.set(1000, 2800);
        this.addChild(this.weaponSlidePanel);

        this.addChild(this.weaponDataPanel);
        this.weaponDataPanel.eventMode = 'none';
        this.weaponDataPanel.alpha = 0;
        
        this.weaponSlidePanel.eventMode = 'static';
        this.weaponSlidePanel.alpha = 1;
    }

    onEnter() {
        this.battleStage.onEnter();
    }

    onLeave() {
        this.battleStage.onLeave();
    }
}