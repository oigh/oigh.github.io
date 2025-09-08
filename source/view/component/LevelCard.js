
export class LevelCard extends PIXI.Container {
    constructor() {
        super();

        this.cardWidth = 1600;
        this.cardHeight = 400;
        this.border = 25;
        this.color = 0xffffff;
        this.init();

        this.pivot.set(800, 200);
    }

    init() {
        this.background = new PIXI.Graphics()
            .beginFill(0x000000)
            .drawRoundedRect(this.border, this.border, this.cardWidth - this.border * 2, this.cardHeight - this.border * 2, 0)
            .endFill();
        this.addChild(this.background);

        this.frame = new PIXI.Graphics()
            .lineStyle(5, 0xFFFFFF, 0.4)
            .drawRect(this.border, this.border, this.cardWidth - this.border * 2, this.cardHeight - this.border * 2);
        this.addChild(this.frame);

        this.createTextLabel();
        this.setupInteractivity();
    }

    createTextLabel() {
        this.titleText = new PIXI.Text('TITLE', {
            ...PIXI.Text.defaultStyle, fill: this.color, fontSize: 50,
        });
        this.titleText.position.set(400, 75);
        this.addChild(this.titleText);

        this.contentText = new PIXI.Text('CONTENT', {
            ...PIXI.Text.defaultStyle, fill: this.color, fontSize: 50,
        });
        this.contentText.position.set(400, 150);
        this.addChild(this.contentText);

        this.appendText = new PIXI.Text('APPEND', {
            ...PIXI.Text.defaultStyle, fill: this.color, fontSize: 50,
        });
        this.appendText.position.set(400, 225);
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