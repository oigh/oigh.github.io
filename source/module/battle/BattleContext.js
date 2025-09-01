import { getArchiveManager, getPlayerManager, getResourceManager } from "../../Game.js";
import { BattleCreature } from "./BattleCreature.js";

export class BattleContext {

    onPlayerChange;
    onEnemyChange;

    onDataUpdate;

    onBulletAdd;
    onBulletRemove;
    onBulletUpdate;

    onHurt;

    constructor() {
        this.level = null;
    }

    createEnemy(enemyKey) {
        const enemyData = getResourceManager().getData('creature', enemyKey);
        enemyData.health *= this.level.level;
        enemyData.attack *= this.level.level;
        this.enemy = new BattleCreature(this, () => { return enemyData; });

        this.onEnemyChange(enemyData);
    }

    loadLevel(levelKey) {

        this.level = getResourceManager().getData('level', levelKey);
        this.enemyArray = this.level.enemy.split('#');
        this.pass = false;
        if (this.enemyArray.length > 0) {
            this.enemyIndex = 0;

            const enemyKey = this.enemyArray[this.enemyIndex];
            this.createEnemy(enemyKey);

            const playerData = getPlayerManager().getPlayer();
            this.player = new BattleCreature(this, () => { return getPlayerManager().getPlayer(); });
            this.onPlayerChange(playerData);

            if (this._bulletList) {
                for (const bullet of this._bulletList) {
                    this.onBulletRemove(bullet);
                }
            }
            this._bulletList = [];
            this.update(0);
        }
        else {
            throw new Error("load empty level");
        }
    }

    addBullet(bullet) {
        this._bulletList.push(bullet);
        this.onBulletAdd(bullet);
    }

    update(delta) {

        if (!this.level) {
            return true;
        }

        if (this.player) {
            this.player.haveTarget = this.enemy && this.enemy.state === BattleCreature.STATE_PLAY;
            this.onDataUpdate(this.player.update(delta), true);
        }

        if (this.enemy) {
            this.enemy.haveTarget = this.player && this.player.state === BattleCreature.STATE_PLAY;
            this.onDataUpdate(this.enemy.update(delta), false);
        }

        for (const bullet of this._bulletList) {
            const scale = bullet.update(delta);
            this.onBulletUpdate(bullet, scale);
        }

        const bulletListShouldBoom = this._bulletList.filter(bullet => bullet.shouldBoom);

        for (const bullet of bulletListShouldBoom) {
            // run hurt effect
            const target = bullet.fromPlayer ? this.enemy : this.player;
            if (target.state === BattleCreature.STATE_PLAY) {
                const damage = Math.min(bullet.damage, target.health);
                target.health -= damage;

                this.onDataUpdate(new Map([['health', target.health]]), !bullet.fromPlayer)
                this.onHurt(bullet);

                if (target.health <= 0) {
                    target.state = BattleCreature.STATE_DEAD;
                }
            }

            this.onBulletRemove(bullet);
        }

        this._bulletList = this._bulletList.filter(bullet => !bullet.shouldBoom);

        // check finish
        if (this.player && this.player.state === BattleCreature.STATE_NULL) {
            return true;
        }

        if (this.enemy && this.enemy.state === BattleCreature.STATE_NULL) {

            // get coin
            getArchiveManager().addProp('coin', this.enemy.getCreature().attack);

            if (this.enemyIndex + 1 < this.enemyArray.length) {
                this.enemyIndex++;
            } else {
                this.pass = true;
                this.enemyIndex = 0;
            }

            const enemyKey = this.enemyArray[this.enemyIndex];
            this.createEnemy(enemyKey);
        }

        return false;
    }
}