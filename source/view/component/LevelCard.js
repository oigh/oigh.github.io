
export class LevelCard extends PIXI.Container {
    constructor() {
        super();

        this.cardWidth = 2000;
        this.cardHeight = 400;
        this.border = 25;
        this.color = 0xffffff;
        this.init();

        this.pivot.set(1000, 200);
    }

    init() {
        this.background = new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(this.border, this.border, this.cardWidth - this.border * 2, this.cardHeight - this.border * 2, 0)
            .endFill();
        this.addChild(this.background);

        this.imageSprite = new PIXI.Sprite(PIXI.Texture.EMPTY);
        this.imageSprite.position.set(this.border, this.border);
        this.imageSprite.width = this.cardWidth - this.border * 2;
        this.imageSprite.height = this.cardWidth / 2 - this.border;
        this.imageSprite.alpha = 0.4;
        const mask = new PIXI.Graphics();
        mask.beginFill(0xffffff);
        mask.drawRect(this.border, this.border, this.cardWidth - this.border * 2, this.cardHeight - this.border * 2);
        mask.endFill();

        this.imageSprite.mask = mask;
        this.addChild(this.imageSprite);
        this.addChild(mask);

        this.frame = new PIXI.Graphics()
            .lineStyle(5, 0xFFFFFF, 0.4)
            .drawRect(this.border, this.border, this.cardWidth - this.border * 2, this.cardHeight - this.border * 2);
        this.addChild(this.frame);

        this.createTextLabel();
        this.setupInteractivity();
    }

    createTextLabel() {
        this.titleBackground = new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(50, 50, 1900, 100, 0)
            .endFill();
        this.titleBackground.alpha = 0.4;
        this.addChild(this.titleBackground);

        this.titleText = new PIXI.Text('TITLE', {
            ...PIXI.Text.defaultStyle, fill: this.color, fontSize: 50,
        });
        this.titleText.position.set(75, 75);
        this.addChild(this.titleText);

        this.contentText = new PIXI.Text('CONTENT', {
            ...PIXI.Text.defaultStyle, fill: this.color, fontSize: 50,
        });
        this.contentText.position.set(75, 150);
        this.addChild(this.contentText);

        this.appendText = new PIXI.Text('APPEND', {
            ...PIXI.Text.defaultStyle, fill: this.color, fontSize: 50,
        });
        this.appendText.position.set(75, 225);
        this.addChild(this.appendText);
    }

    setupInteractivity() {
        this.eventMode = 'static';
        // this.cursor = 'pointer';

        this.on('pointerover', this.onPointerOver.bind(this))
            .on('pointerout', this.onPointerOut.bind(this))
            .on('pointerdown', this.onPointerDown.bind(this))
            .on('pointerup', this.onPointerUp.bind(this));

        this.on('pointermove', this.onPointerMove.bind(this));
    }

    onPointerOver() {
    }

    onPointerMove() {
        this.click = false;
    }

    onPointerOut() {
    }

    onPointerDown() {
        this.click = true;
    }

    onPointerUp() {
        if (this.click) {
            this.click = false;
            this.emit('clickWithoutMove', this);
        }
    }

    setLevel(levelProfile) {
        this.levelProfile = levelProfile;
        this.imageSprite.texture = PIXI.Texture.from(`resource/image/level/${this.levelProfile.image}.png`);
        this.refreshLevel();
    }

    refreshLevel() {
        if (!this.levelProfile) {
            return;
        }

        this.titleText.text = this.levelProfile.name;
        this.contentText.text = ``;
        this.appendText.text = ``;
    }
}