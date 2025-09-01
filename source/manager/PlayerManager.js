import { getResourceManager } from "../Game.js";

export class PlayerManager {

    constructor() {
        this._obs = new Set();
    }

    subscribe(observer) {
        this._obs.add(observer);
        if (this._data !== null) {
            observer(this._data);
        }
        return () => this.unsubscribe(observer);
    }

    unsubscribe(observer) {
        this._obs.delete(observer);
    }

    updatePlayerData(weapons) {
        this._data = getResourceManager().getData('creature', 'Girl');
        for (const weaponKey in weapons) {
            const gameWeapon = weapons[weaponKey];
            const weaponProfile = getResourceManager().getData('weapon', weaponKey);
            const attackValue = (Number(weaponProfile.strength) + Number(gameWeapon.appendStrength)) * gameWeapon.level;
            this._data.attack = Number(this._data.attack) + attackValue;
        }

        this._obs.forEach(observer => {
            try {
                observer(this._data);
            } catch (e) {
                console.error("observer error:", e);
            }
        });
    }

    getPlayer() {
        return this._data
    }
}