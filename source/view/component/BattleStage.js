import { CreatureCard } from './CreatureCard.js';
import { BattleContext } from "../../module/battle/BattleContext.js";
import { BulletSprite } from "./BulletSprite.js";
import { TextEffect } from "./TextEffect.js";
import { AnimHelper } from "../../helper/AnimHelper.js";
import { getArchiveManager, getResourceManager } from '../../Game.js';
import { TextButton } from './TextButton.js';

export class BattleStage extends PIXI.Container {
    constructor(app) {
        super();
        this.app = app;

        this.playerCard = new CreatureCard();
        this.playerCard.position.set(-500, 0);
        this.addChild(this.playerCard);

        this.enemyCard = new CreatureCard(true);
        this.enemyCard.position.set(500, 0);
        this.addChild(this.enemyCard);

        this.topText = new PIXI.Text('', {
            ...PIXI.Text.defaultStyle,
            fontSize: 50,
        });
        this.topText.anchor.set(0.5);
        this.topText.position.set(0, -500);
        this.addChild(this.topText);

        this.bottomText = new PIXI.Text('', {
            ...PIXI.Text.defaultStyle,
            fontSize: 50,
        });
        this.bottomText.anchor.set(0.5);
        this.bottomText.position.set(0, 500);
        this.addChild(this.bottomText);

        this.nextButton = new TextButton(1000);
        this.nextButton.position.set(0, 500);
        this.addChild(this.nextButton);

        this.initBattleContext();
    }

    update() {
        if (this.battleContext.update(this.app.ticker.elapsedMS)) {
            this.battleContext.loadLevel(getArchiveManager().LocalGameStatus.level, true);
        }
    }

    onEnter() {
        this.app.ticker.add(this.update, this);
    }

    onLeave() {
        this.app.ticker.remove(this.update, this);
    }

    initBattleContext() {
        this._bulletMap = new Map();

        this._effectCancelHandlerList = [];

        this.battleContext = new BattleContext();

        this.battleContext.onPlayerChange = (player) => {
            this.playerCard.setCreature(player);
        };

        this.battleContext.onEnemyChange = (enemy) => {

            const status = getArchiveManager().LocalGameStatus;
            const levelArray = Array.from(getResourceManager().getTable('level'));

            let index = -1;
            let currentIndex = 0;

            for (const value of levelArray) {
                if (value[1].key === status.level) {
                    index = currentIndex;
                    break;
                }
                currentIndex++;
            }

            const nextLevelIndex = index + 1;
            const nextLevel = levelArray[nextLevelIndex][1];

            this.nextButton.titleText.text = `进入下一关卡: ${nextLevel.name}`;
            this.nextButton.on('pointerup', () => {
                if (nextLevelIndex < levelArray.length) {
                    const status = getArchiveManager().LocalGameStatus;
                    status.level = levelArray[nextLevelIndex][1].key;
                    getArchiveManager().LocalGameStatus = status;
                    this.battleContext.loadLevel(getArchiveManager().LocalGameStatus.level, false);
                }
            });

            this.topText.text = `当前关卡: ${this.battleContext.level.name}`;
            if (this.battleContext.pass) {
                this.bottomText.text = ``;
                this.nextButton.alpha = 1;
                this.nextButton.eventMode = 'static';
            }
            else {
                const enemyData = getResourceManager().getData('creature', this.battleContext.enemyArray[this.battleContext.enemyArray.length - 1]);
                this.bottomText.text = `击败BOSS${enemyData.name}解锁下一关卡: ${nextLevel.name}`;
                this.nextButton.alpha = 0;
                this.nextButton.eventMode = 'none';
            }
            this.enemyCard.setCreature(enemy);
        };

        this.battleContext.onBulletAdd = (bullet) => {

            const texture = PIXI.Texture.from(`resource/image/weapon/knife.png`);

            const bulletSprite = new BulletSprite(texture, !bullet.fromPlayer);
            if (bullet.fromPlayer) {
                bulletSprite.position = this.playerCard.position;
            } else {
                bulletSprite.position = this.enemyCard.position;
            }

            this._bulletMap.set(bullet, bulletSprite);
            this.addChild(this._bulletMap.get(bullet));
        };

        this.battleContext.onBulletRemove = (bullet) => {
            if (!this._bulletMap.has(bullet)) {
                return;
            }

            this.removeChild(this._bulletMap.get(bullet));
            this._bulletMap.delete(bullet);
        };

        this.battleContext.onBulletUpdate = (bullet, scale) => {
            if (!this._bulletMap.has(bullet)) {
                return;
            }

            if (bullet.fromPlayer) {
                this._bulletMap.get(bullet).x = this.playerCard.position.x + 1000 * scale;
            } else {
                this._bulletMap.get(bullet).x = this.enemyCard.position.x - 1000 * scale;
            }
        };

        this.battleContext.onHurt = (bullet) => {
            const text = '-' + bullet.damage;
            const color = 0xFF0000;
            if (bullet.fromPlayer) {
                const hurtTextEffect = new TextEffect(text, color, this.enemyCard.position);
                this.addChild(hurtTextEffect);
                const destroy = () => {
                    this.removeChild(hurtTextEffect);
                }
                this._effectCancelHandlerList.push(AnimHelper.doMove(hurtTextEffect, new PIXI.Point(hurtTextEffect.x, hurtTextEffect.y - 50), 500, destroy, destroy));
            } else {
                const hurtTextEffect = new TextEffect(text, color, this.playerCard.position);
                this.addChild(hurtTextEffect);
                const destroy = () => {
                    this.removeChild(hurtTextEffect);
                }
                this._effectCancelHandlerList.push(AnimHelper.doMove(hurtTextEffect, new PIXI.Point(hurtTextEffect.x, hurtTextEffect.y - 50), 500, destroy, destroy));
            }
        };

        this.battleContext.onDataUpdate = (map, isPlayer) => {
            const card = isPlayer ? this.playerCard : this.enemyCard;
            for (const [key, value] of map) {
                switch (key) {
                    case 'alpha':
                        card.alpha = value;
                        break;
                    case 'health':
                        card.setHealth(value)
                        break;
                }
            }
        }

        this.battleContext.loadLevel(getArchiveManager().LocalGameStatus.level, false);
    }
}