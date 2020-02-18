
import {Canvas2D} from './canvas2d/Canvas2D';
class Canvas2DUtil {
    public context:CanvasRenderingContext2D|null;
    public constructor(canvas:HTMLCanvasElement){
        this.context = canvas.getContext('2d');
    }
    public drawText(text:string):void{
        if (this.context !== null) {
            this.context.save();
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
    
            let centerX:number = this.context.canvas.width * 0.5;
            let centerY:number = this.context.canvas.height * 0.5;
    
            this.context.fillText(text,centerX,centerY);
            this.context.strokeStyle = 'green';
            this.context.strokeText(text,centerX,centerY);
            this.context.restore();
        }
    }
}


let canvas:HTMLCanvasElement|null = document.getElementById('canvas') as HTMLCanvasElement;
if (canvas === null) {
    throw new Error('无法获取HTMLCanvasElement!');
}
// let canvas2d:Canvas2DUtil = new Canvas2DUtil(canvas);
let canvas2d:Canvas2D = new Canvas2D(canvas);
canvas2d.drawText("Hello World");