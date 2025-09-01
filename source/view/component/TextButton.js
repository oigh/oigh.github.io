export class TextButton extends PIXI.Container {
    constructor(width = 250, height = 125) {
        super();

        this.cardWidth = width;
        this.cardHeight = height;
        this.border = 5;
        this.color = 0xffffff;
        this.init();

        this.pivot.set(width / 2, height / 2);
    }

    init() {
        this.frame = new PIXI.Graphics()
            .lineStyle(this.border, 0xFFFFFF, 0.2)
            .drawRect(this.border, this.border, this.cardWidth - this.border * 2, this.cardHeight - this.border * 2);
        this.addChild(this.frame);

        this.createTitleLabel();
        this.setupInteractivity();
    }

    createTitleLabel() {
        this.titleText = new PIXI.Text('', {
            ...PIXI.Text.defaultStyle,
            fill: this.color,
            fontSize: 50,
        });
        this.titleText.anchor.set(0.5);
        this.titleText.position.set(this.cardWidth / 2, this.cardHeight / 2);
        this.addChild(this.titleText);
    }

    setupInteractivity() {
        this.eventMode = 'static';
        // this.cursor = 'pointer';

        this.on('pointerover', this.onPointerOver.bind(this))
            .on('pointerout', this.onPointerOut.bind(this))
            .on('pointerdown', this.onPointerDown.bind(this))
            .on('pointerup', this.onPointerUp.bind(this));
    }

    onPointerOver() {
    }

    onPointerOut() {
    }

    onPointerDown() {
    }

    onPointerUp() {
    }
}