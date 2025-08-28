import { getArchiveManager } from "../../Game.js";
import { NumberHelper } from "../../helper/NumberHelper.js";
import { ATTRIBUTE_CHINESE } from "../../module/design/AttributeChinese.js";
import { AttributeFormatter } from "../../module/design/AttributeFomatter.js";
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
        this.strengthUpButton.position.set(600, 225);
        this.strengthUpButton.titleText.text = '强化';
        this.addChild(this.strengthUpButton);

        this.starUpButton = new TextButton();
        this.starUpButton.position.set(600, 375);
        this.starUpButton.titleText.text = '升星';
        this.addChild(this.starUpButton);

        this.levelUpButton = new TextButton();
        this.levelUpButton.position.set(600, 525);
        this.levelUpButton.titleText.text = '升级';
        this.addChild(this.levelUpButton);

        this.background.eventMode = 'static';
        this.background.on('pointerdown', this.onBackgroundClick.bind(this));
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

        let y = -175;
        const stepY = 75;

        this.attackLabelText = new PIXI.Text('ATTACK_LABEL', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.attackLabelText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.attackLabelText);

        y += stepY;

        this.attackDescriptionText = new PIXI.Text('攻击 = (基础强度 + 附加强度) x 等级', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.attackDescriptionText.alpha = 0.4;
        this.attackDescriptionText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.attackDescriptionText);

        y += stepY;

        this.appendValueText = new PIXI.Text('VALUE_LABEL', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.appendValueText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.appendValueText);

        y += stepY;

        this.appendValueDescriptionText = new PIXI.Text('附加属性 = 基础附加属性 x 星级', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.appendValueDescriptionText.alpha = 0.4;
        this.appendValueDescriptionText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.appendValueDescriptionText);

        y += stepY;

        this.baseAttackText = new PIXI.Text('BASE_ATTACK', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.baseAttackText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.baseAttackText);

        y += stepY;

        this.appendAttackText = new PIXI.Text('APPEND_ATTACK', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.appendAttackText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.appendAttackText);

        y += stepY;

        this.levelText = new PIXI.Text('LEVEL', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.levelText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.levelText);

        y += stepY;

        this.starText = new PIXI.Text('STAR', {
            ...PIXI.Text.defaultStyle, fontSize: 50,
        });
        this.starText.position.set(-this.panelWidth / 2 + 100, y);
        this.addChild(this.starText);
    }

    setWeapon(weapon) {
        let gameWeapon = getArchiveManager().LocalGameStatus.weapons[weapon.key];

        if (!gameWeapon) {
            gameWeapon = new GameWeapon();
        }

        const cm = new PIXI.ColorMatrixFilter();
        cm.matrix = [1, 0, 0, 0, 0, // R
            0, 1, 0, 0, 0, // G
            0, 0, 0.7, 0, 0, // B
            0, 0, 0, 1, 0  // A
        ];

        for (let i = 0; i < this.starArray.length; i++) {
            if (i < gameWeapon.star) {
                this.starArray[i].alpha = 1;
                this.starArray[i].filters = [cm];
            } else {
                this.starArray[i].alpha = 0.1;
            }
        }

        this.icon.imageSprite.texture = PIXI.Texture.from(`resource/image/weapon/${weapon.image}.png`);
        this.titleText.text = `L${gameWeapon.level} ${weapon.name} + ${gameWeapon.appendStrength}`;
        const attackDamage = (Number(weapon.strength) + Number(gameWeapon.appendStrength)) * gameWeapon.level;
        this.contentText.text = `攻击: ${NumberHelper.formatNumber(attackDamage)}`;
        this.attackLabelText.text = `攻击: ${NumberHelper.formatNumber(attackDamage)} = (${weapon.strength} + ${gameWeapon.appendStrength}) x ${gameWeapon.level}`;

        const appendValue = Number(weapon.appendBaseValue) * gameWeapon.star;
        const chinese = ATTRIBUTE_CHINESE[weapon.appendType];
        this.appendText.text = `${chinese}: ${AttributeFormatter.f(weapon.appendType, appendValue)}`;
        this.appendValueText.text = `${chinese}: ${AttributeFormatter.f(weapon.appendType, weapon.appendBaseValue)} x ${gameWeapon.star}`;

        this.baseAttackText.text = `基础强度: ${weapon.strength}`;

        const props = getArchiveManager().LocalGameStatus.props;

        this.appendAttackText.text = `附加强度: ${gameWeapon.appendStrength}  强化需要${'stoneName'}: ${(Number(weapon.strength) + Number(gameWeapon.appendStrength)) + `(${props[weapon.key + 'Stone'] ?? 0})`}`;
        
        this.starText.text = `星级: ${gameWeapon.star}  升星需要${'starName'}: ${2 ** gameWeapon.star + `(${props[weapon.key + 'Stone'] ?? 0})`}`;
    }
}