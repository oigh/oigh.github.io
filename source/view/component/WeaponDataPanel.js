import { getArchiveManager } from "../../Game.js";
import { NumberHelper } from "../../helper/NumberHelper.js";
import { ATTRIBUTE_CHINESE } from "../../module/design/AttributeChinese.js";
import { AttributeFormatter } from "../../module/design/AttributeFomatter.js";
import { GameWeapon } from "../../module/design/GameWeapon.js";
import { TextButton } from "./TextButton.js";
import { WeaponIcon } from "./WeaponIcon.js";

export class WeaponDataPanel extends PIXI.Container {
    constructor() {
        super();

        this.pageWidth = 2000;
        this.pageHeight = 1600;

        this.panelWidth = 1600;
        this.panelHeight = 1200;

        this.setup();

        const unsubscribeHandle = getArchiveManager().subscribe((gameStatus) => {
            if (this.weaponProfile) {
                this.gameWeapon = gameStatus.weapons[this.weaponProfile.key] ?? new GameWeapon();
                this.refreshWeapon();
            }
        });
    }

    setup() {
        this.background = new PIXI.Graphics()
            .beginFill(0x000000, 0.4)
            .drawRoundedRect(-this.pageWidth / 2, -this.pageHeight / 2, this.pageWidth, this.pageHeight, 0)
            .endFill();
        this.addChild(this.background);

        this.panel = new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(-this.panelWidth / 2, -this.panelHeight / 2, this.panelWidth, this.panelHeight, 0)
            .endFill();
        this.addChild(this.panel);

        this.frame = new PIXI.Graphics()
            .lineStyle(5, 0xFFFFFF, 0.1)
            .drawRect(-this.panelWidth / 2, -this.panelHeight / 2, this.panelWidth, this.panelHeight);
        this.addChild(this.frame);

        this.icon = new WeaponIcon();
        this.icon.position.set(-this.panelWidth / 2 + 200, -this.panelHeight / 2 + 200);
        this.addChild(this.icon);

        this.createTextLabel();
        this.createStarLabel();

        this.strengthUpButton = new TextButton();
        this.strengthUpButton.position.set(600, -50);
        this.strengthUpButton.titleText.text = '强化';
        this.strengthUpButton.on('pointerup', this.onAppendStrengthUpClick.bind(this));
        this.addChild(this.strengthUpButton);

        this.starUpButton = new TextButton();
        this.starUpButton.position.set(600, 200);
        this.starUpButton.titleText.text = '升星';
        this.starUpButton.on('pointerup', this.onStarUpClick.bind(this));
        this.addChild(this.starUpButton);

        this.levelUpButton = new TextButton();
        this.levelUpButton.position.set(600, 450);
        this.levelUpButton.titleText.text = '升级';
        this.levelUpButton.on('pointerup', this.onLevelUpClick.bind(this));
        this.addChild(this.levelUpButton);

        this.background.eventMode = 'static';
        this.background.on('pointerup', this.onBackgroundClick.bind(this));
    }

    onBackgroundClick() {
        this.eventMode = 'none';
        this.alpha = 0;
    }

    createStarLabel() {

        const texture = PIXI.Texture.from(`resource/image/icon/star.png`);

        this.starArray = [];
        for (let i = 0; i < 10; i++) {
            const sprite = new PIXI.Sprite(texture);
            sprite.position.set(-400 + 60 * i + 5, -300);
            sprite.width = 50;
            sprite.height = 50;

            this.addChild(sprite);
            this.starArray.push(sprite);
        }
    }

    createTextLabel() {

        this.titleText = new PIXI.Text('TITLE', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.titleText.position.set(-400, -525);
        this.addChild(this.titleText);

        this.contentText = new PIXI.Text('CONTENT', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.contentText.position.set(-400, -450);
        this.addChild(this.contentText);

        this.appendText = new PIXI.Text('APPEND', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.appendText.position.set(-400, -375);
        this.addChild(this.appendText);

        let y = -200;

        this.attackDescriptionText = new PIXI.Text('攻击 = (基础强度 + 附加强度) x 等级', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.attackDescriptionText.alpha = 0.4;
        this.attackDescriptionText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.attackDescriptionText);

        y += 75;

        this.appendValueDescriptionText = new PIXI.Text('附加属性 = 基础附加属性 x 星级', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.appendValueDescriptionText.alpha = 0.4;
        this.appendValueDescriptionText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.appendValueDescriptionText);

        y += 100;

        this.baseStrengthText = new PIXI.Text('BASE_STRENGTH', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.baseStrengthText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.baseStrengthText);

        y += 75;

        this.appendStrengthText = new PIXI.Text('APPEND_STRENGTH', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.appendStrengthText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.appendStrengthText);

        y += 75;

        this.appendStrengthDescriptionText = new PIXI.Text('APPEND_STRENGTH_DESCRIPTION', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.appendStrengthDescriptionText.alpha = 0.4;
        this.appendStrengthDescriptionText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.appendStrengthDescriptionText);

        y += 100;

        this.starText = new PIXI.Text('STAR', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.starText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.starText);

        y += 75;

        this.starDescriptionText = new PIXI.Text('STAR_DESCRIPTION', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.starDescriptionText.alpha = 0.4;
        this.starDescriptionText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.starDescriptionText);

        y += 100;

        this.levelText = new PIXI.Text('LEVEL', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.levelText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.levelText);

        y += 75;

        this.levelDescriptionText = new PIXI.Text('LEVEL_DESCRIPTION', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.levelDescriptionText.alpha = 0.4;
        this.levelDescriptionText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.levelDescriptionText);
    }

    setWeapon(weaponProfile) {
        this.weaponProfile = weaponProfile;
        this.icon.imageSprite.texture = PIXI.Texture.from(`resource/image/weapon/${this.weaponProfile.image}.png`);
        this.gameWeapon = getArchiveManager().LocalGameStatus.weapons[this.weaponProfile.key] ?? new GameWeapon();
        this.refreshWeapon();
    }

    refreshWeapon() {
        if (!this.weaponProfile || !this.gameWeapon) {
            return;
        }

        const cm = new PIXI.ColorMatrixFilter();
        cm.matrix = [1, 0, 0, 0, 0, // R
            0, 1, 0, 0, 0, // G
            0, 0, 0.7, 0, 0, // B
            0, 0, 0, 1, 0  // A
        ];

        for (let i = 0; i < this.starArray.length; i++) {
            if (i < this.gameWeapon.star) {
                this.starArray[i].alpha = 1;
                this.starArray[i].filters = [cm];
            } else {
                this.starArray[i].alpha = 0.1;
            }
        }

        this.titleText.text = `L${this.gameWeapon.level} ${this.weaponProfile.name} + ${this.gameWeapon.appendStrength}`;
        const attackDamage = (Number(this.weaponProfile.strength) + Number(this.gameWeapon.appendStrength)) * this.gameWeapon.level;
        this.contentText.text = `攻击: ${NumberHelper.formatNumber(attackDamage)} = (${this.weaponProfile.strength} + ${this.gameWeapon.appendStrength}) x ${this.gameWeapon.level}`;

        const appendValue = this.weaponProfile.appendBaseValue * this.gameWeapon.star;
        const chinese = ATTRIBUTE_CHINESE[this.weaponProfile.appendType];
        this.appendText.text = `${chinese}: ${AttributeFormatter.f(this.weaponProfile.appendType, appendValue)} = ${AttributeFormatter.f(this.weaponProfile.appendType, this.weaponProfile.appendBaseValue)} x ${this.gameWeapon.star}`;

        this.baseStrengthText.text = `基础强度: ${this.weaponProfile.strength}`;

        this.appendStrengthText.text = `附加强度: ${this.gameWeapon.appendStrength}`;
        this.starText.text = `星级: ${this.gameWeapon.star}`;
        this.levelText.text = `等级: ${this.gameWeapon.level}`;

        const props = getArchiveManager().LocalGameStatus.props;

        this.appendStrengthDescriptionText.text = `强化需要${this.weaponProfile.stoneName}: ${GameWeapon.getAppendStrengthUpCost(this.gameWeapon)}(${props[this.weaponProfile.key + 'Stone'] ?? 0})`;
        this.starDescriptionText.text = `升星需要${this.weaponProfile.starName}: ${GameWeapon.getStarUpCost(this.gameWeapon)}(${props[this.weaponProfile.key + 'Star'] ?? 0})`;
        this.levelDescriptionText.text = `升级需要金币: ${NumberHelper.fn(GameWeapon.getLevelUpCost(this.weaponProfile, this.gameWeapon))}(${NumberHelper.fn(props['coin'] ?? 0)})`;
    }

    onLevelUpClick() {
        if (!this.weaponProfile) {
            return;
        }

        const status = getArchiveManager().LocalGameStatus;

        const cost = GameWeapon.getLevelUpCost(this.weaponProfile, this.gameWeapon);
        if (!status.props['coin'] || status.props['coin'] < cost) {
            return;
        }

        this.gameWeapon = status.weapons[this.weaponProfile.key];

        if (!this.gameWeapon) {
            this.gameWeapon = new GameWeapon();
        }

        this.gameWeapon.level += 1;
        status.props['coin'] -= cost;

        getArchiveManager().LocalGameStatus = status;
    }

    onStarUpClick() {
        if (!this.weaponProfile) {
            return;
        }

        const status = getArchiveManager().LocalGameStatus;

        const cost = GameWeapon.getStarUpCost(this.gameWeapon);
        if (!status.props[this.weaponProfile.key + 'Star'] || status.props[this.weaponProfile.key + 'Star'] < cost) {
            return;
        }

        this.gameWeapon = status.weapons[this.weaponProfile.key];

        if (!this.gameWeapon) {
            this.gameWeapon = new GameWeapon();
        }

        this.gameWeapon.star += 1;
        status.props[this.weaponProfile.key + 'Star'] -= cost;

        getArchiveManager().LocalGameStatus = status;
    }

    onAppendStrengthUpClick() {
        if (!this.weaponProfile) {
            return;
        }

        const status = getArchiveManager().LocalGameStatus;

        const cost = GameWeapon.getAppendStrengthUpCost(this.gameWeapon);
        if (!status.props[this.weaponProfile.key + 'Stone'] || status.props[this.weaponProfile.key + 'Stone'] < cost) {
            return;
        }

        this.gameWeapon = status.weapons[this.weaponProfile.key];

        if (!this.gameWeapon) {
            this.gameWeapon = new GameWeapon();
        }

        this.gameWeapon.appendStrength += 1;
        status.props[this.weaponProfile.key + 'Stone'] -= cost;

        getArchiveManager().LocalGameStatus = status;
    }
}