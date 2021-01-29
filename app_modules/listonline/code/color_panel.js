import {connect} from './connect.js';
export const colorPanel = {
    elem: document.querySelector('.listonline__header-button-block-color-panel'),
    canvas: document.querySelector('.listonline-header-button-block-color-panel-canvas-area'),
    context: document.querySelector('.listonline-header-button-block-color-panel-canvas-area').getContext('2d'),
    status: 'inactiv',
    activColor: '#b6b6b6',
    openPanel: function(){        
        this.elem.addEventListener('click', () => {
            if (this.status == 'inactiv') {
                this.elem.style.width = '100%';
                this.status = 'activ';
                this.canvasPaint();
            }
        })
    },
    closePanel: function(){
        document.addEventListener('click', (event) => {
            if (event.target.className != 'listonline-header-button-block-color-panel-canvas-area') {
                this.elem.style.width = '';
                this.canvasPaint();
                this.status = 'inactiv';
            }
        })
    },
    canvasPaint: function(){
        const canvasWidth = getComputedStyle(this.elem).width.split('px')[0];
        this.canvas.width = canvasWidth;
        this.canvas.height= '32';        

        this.context.beginPath();
        this.context.moveTo(4, 16);
        this.context.lineTo(4, 6);
        this.context.arcTo(4, 4, 6, 4, 2);
        this.context.lineTo(canvasWidth-6, 4);
        this.context.arcTo(canvasWidth-4, 4, canvasWidth-4, 6, 2);
        this.context.lineTo(canvasWidth-4, 26);
        this.context.arcTo(canvasWidth-4, 28, canvasWidth-6, 28, 2);
        this.context.lineTo(6, 28);
        this.context.arcTo(4, 28, 4, 26, 2);
        this.context.lineTo(4, 16);


        // this.context.beginPath();
        // this.context.moveTo(4,16);
        // this.context.lineTo(canvasWidth - 16, 4);
        // this.context.arcTo(canvasWidth - 4, 4, canvasWidth - 4, 16, 12);
        // this.context.arcTo(canvasWidth - 4, 28, canvasWidth - 16, 28, 12);
        // this.context.lineTo(16, 28);
        // this.context.arcTo(4, 28, 4, 16, 12);
        // this.context.arcTo(4, 4, 16, 4, 12);

        let gradient = this.context.createLinearGradient(4, 25, canvasWidth, 0);
        gradient.addColorStop(0, '#f0cac5');
        gradient.addColorStop(0.1, '#e67d71');
        gradient.addColorStop(0.2, '#8da8c5');
        gradient.addColorStop(0.3, '#005287');
        gradient.addColorStop(0.4, '#fdf561');
        gradient.addColorStop(0.5, '#ffa400');
        gradient.addColorStop(0.6, '#9499a5');
        gradient.addColorStop(0.7, '#d7493c');
        gradient.addColorStop(0.8, '#b19070');
        gradient.addColorStop(0.9, '#81c268');
        gradient.addColorStop(1, '#96dfe0');
        
        // gradient.addColorStop(0, '#f8cacc');
        // gradient.addColorStop(0.1, '#ec3b44');
        // gradient.addColorStop(0.2, '#69c16f');
        // gradient.addColorStop(0.3, '#fbb611');
        // gradient.addColorStop(0.4, '#b500c1');
        // gradient.addColorStop(0.5, '#9b97a2');
        // gradient.addColorStop(0.6, '#f27274');
        // gradient.addColorStop(0.7, '#f4e473');
        // gradient.addColorStop(0.8, '#95d4d5');
        // gradient.addColorStop(0.9, '#075385');
        // gradient.addColorStop(1, '#ba9277');

        this.context.strokeStyle = gradient;
        this.context.lineWidth = 2;
        this.context.fillStyle = gradient;

        this.context.fill();
        this.context.stroke();
    },
    changeColor: function(){
        this.canvas.addEventListener('click', (event) => {
            let colorArray = this.context.getImageData(event.offsetX, event.offsetY, 1, 1).data;
            this.activColor = `rgb(${colorArray[0]},${colorArray[1]},${colorArray[2]},1)`;
            if (this.status == 'activ' && this.activColor != 'rgb(0,0,0,1)') {
                connect.controller({action: 'change_color', data: this.activColor});
            }
        })
    },
    updateColorPanel: function(){
        window.addEventListener('resize', update.bind(this))
        function update () {
            this.canvas.style.display = 'none';
            this.canvasPaint();
            this.canvas.style.display = 'flex';
        }
    },
    start: function(){
        this.openPanel();
        this.closePanel();
        setTimeout(this.canvasPaint.bind(this),100);
        this.changeColor();
        this.updateColorPanel();
    }
}
