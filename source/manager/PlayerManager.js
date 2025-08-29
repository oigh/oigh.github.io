import { getResourceManager } from "../Game.js";

export class PlayerManager {

    constructor(weapons) {
        this._obs = new Set();
        this.updatePlayerData(weapons);
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
        this._data = { ...getResourceManager().getData('creature', 'Girl') };
        for (const weaponKey in weapons) {
            const gameWeapon = weapons[weaponKey];
            const weaponProfile = getResourceManager().getData('weapon', weaponKey);
            const attackValue = (Number(weaponProfile.strength) + Number(gameWeapon.appendStrength)) * gameWeapon.level;
            this._data.attack = Number(this._data.attack) + attackValue;
        }
    }

    getPlayer() {
        return this._data
    }
}