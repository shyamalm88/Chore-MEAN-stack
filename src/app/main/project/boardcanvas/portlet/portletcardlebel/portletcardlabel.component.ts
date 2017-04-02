import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({

    selector: 'chore-portlet-card-label',
    templateUrl: './portletcardlabel.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PortletCardLabelComponent implements OnInit{
    @Input()card:any
    private cardName;
    constructor() { }

    ngOnInit(){
        this.cardName = this.card.portletCardName;
    }

}