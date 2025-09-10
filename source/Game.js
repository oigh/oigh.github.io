import { PageManager } from "./manager/PageManager.js";
import { StartPage } from "./view/page/StartPage.js";
import { PlayerManager } from "./manager/PlayerManager.js";
import { ResourceManager } from "./manager/ResourceManager.js";
import { ArchiveManager } from "./manager/ArchiveManager.js";
import { WeaponDataPanel } from "./view/component/WeaponDataPanel.js";
import { GameStatus } from "./module/design/GameStatus.js";
import { GameWeapon } from "./module/design/GameWeapon.js";

let pageManager = null;
let playerManager = null;
let resourceManager = null;
let archiveManager = null;

export function initGame(app) {
    initResourceManager().then(() => {
        archiveManager = new ArchiveManager();
        playerManager = new PlayerManager();

        // init
        // getArchiveManager().LocalGameStatus = null;
        if (!getArchiveManager().LocalGameStatus) {
            const status = new GameStatus();
            status.weapons[Array.from(getResourceManager().getTable('weapon'))[0][0]] = new GameWeapon(1);
            getArchiveManager().LocalGameStatus = status;
        }

        getArchiveManager().subscribe((gameStatus => {
            getPlayerManager().updatePlayerData(gameStatus.weapons);
        }))

        initPageManager(app);
    });
}

function initPageManager(app) {
    pageManager = new PageManager(app);
    pageManager.registerPage("start", new StartPage(app));
    pageManager.switchTo("start").then();
}

async function initResourceManager() {
    resourceManager = new ResourceManager();
    await resourceManager.loadTable('weapon', 'resource/table/weapon.csv');
    await resourceManager.loadTable('creature', 'resource/table/creature.csv');
    await resourceManager.loadTable('level', 'resource/table/level.csv');
}

export function getPageManager() {
    if (!pageManager) {
        throw new Error("manager not exist");
    }
    return pageManager;
}

export function getPlayerManager() {
    if (!playerManager) {
        throw new Error("manager not exist");
    }
    return playerManager;
}

export function getResourceManager() {
    if (!resourceManager) {
        throw new Error("manager not exist");
    }
    return resourceManager;
}

export function getArchiveManager() {
    if (!archiveManager) {
        throw new Error("manager not exist");
    }
    return archiveManager;
}