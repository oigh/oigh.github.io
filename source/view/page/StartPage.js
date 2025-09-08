import { BattleStage } from "../component/BattleStage.js";
import { WeaponSlidePanel } from "../component/WeaponSlidePanel.js";
import { PlayerPanel } from "../component/PlayerPanel.js";
import { CoinPanel } from "../component/CoinPanel.js";
import { TopPanel } from "../component/TopPanel.js";
import { BottomPanel } from "../component/BottomPanel.js";
import { LevelSlidePanel } from "../component/LevelSlidePanel.js";
import { getArchiveManager } from "../../Game.js";

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

        this.weaponPanel = new WeaponSlidePanel(this.app);
        this.weaponPanel.position.set(1000, 2800);
        this.addChild(this.weaponPanel);

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
        this.levelSlidePanel.position.set(1000, 2000);
        this.addChild(this.levelSlidePanel);

        this.levelSlidePanel.eventMode = 'none';
        this.levelSlidePanel.alpha = 0;

        this.topPanel.mapButton.on('pointerup', () => {
            this.levelSlidePanel.eventMode = 'static';
            this.levelSlidePanel.alpha = 1;
        });

        this.levelSlidePanel.on('levelSelect', (level) => {
            const status = getArchiveManager().LocalGameStatus;
            status.level = level.key;
            getArchiveManager().LocalGameStatus = status;
            this.battleStage.battleContext.loadLevel(getArchiveManager().LocalGameStatus.level, false);
        });
    }

    onEnter() {
        this.battleStage.onEnter();
    }

    onLeave() {
        this.battleStage.onLeave();
    }
}