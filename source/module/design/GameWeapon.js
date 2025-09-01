export class GameWeapon {

    constructor(level = 0) {
        this.level = level
        this.appendStrength = 0;
        this.star = 0;
    }

    static getLevelUpCost(profile, gameWeapon) {
        return profile.strength * gameWeapon.level;
    }

    static getStarUpCost(gameWeapon) {
        return 2 ** gameWeapon.star;
    }

    static getAppendStrengthUpCost(gameWeapon) {
        return 2 ** gameWeapon.appendStrength;
    }
}