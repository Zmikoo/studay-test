export class Canvas2D {
    constructor(canvas) {
        this.context = canvas.getContext('2d');
    }
    drawText(text) {
        if (this.context !== null) {
            this.context.save();
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            let centerX = this.context.canvas.width * 0.5;
            let centerY = this.context.canvas.height * 0.5;
            this.context.fillText(text, centerX, centerY);
            this.context.strokeStyle = 'green';
            this.context.strokeText(text, centerX, centerY);
            this.context.restore();
        }
    }
}
