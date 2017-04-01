import { Component, Input, OnInit, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
    selector: 'chore-single-select',
    templateUrl: './singleSelect.component.html'
})
export class SingleSelectComponent implements OnChanges {

    @Input() teams;
    @Output() onSelected = new EventEmitter<boolean>();

    public items: Array<string>;
    public teamsName = [];



    private value: any = {};
    private _disabledV: String = '0';
    private disabled: Boolean = false;

    ngOnChanges() {
        for (let i = 0; i < this.teams.length; i++) {
            this.teamsName.push(this.teams[i].name);
        }
        this.items = this.teamsName;

    }

    private get disabledV(): String {
        return this._disabledV;
    }

    private set disabledV(value: String) {
        this._disabledV = value;
        this.disabled = this._disabledV === '1';
    }

    public selected(value: any): void {
        //console.log('Selected value is: ', value);
        this.onSelected.emit(value.text);
    }

    public removed(value: any): void {
        //console.log('Removed value is: ', value);
    }

    public typed(value: any): void {
        //console.log('New search input: ', value);
    }

    public refreshValue(value: any): void {
        this.value = value;
    }


}