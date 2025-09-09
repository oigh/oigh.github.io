import { getResourceManager } from "../../Game.js";

export class GameStatus {

    constructor() {
        this.weapons = {};
        this.props = {
            coin: 0,
            ruby: 0,
        };

        this.level = getResourceManager().getTable('level').values().next().value.key;
        this.weaponStep = 1;
        this.levelStep = 1;
    }
}