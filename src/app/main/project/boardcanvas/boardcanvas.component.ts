import { Component, ViewEncapsulation, Input } from "@angular/core";

@Component({

    selector: 'chore-board-canvas',
    templateUrl: './boardcanvas.component.html',
    encapsulation: ViewEncapsulation.None
})

export class BoardCanvasComponent{

    @Input() board: any;

    constructor(){}
}