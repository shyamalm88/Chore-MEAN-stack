import {Component} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'chore-board-dropdown',
  templateUrl: './board.dropdown.component.html',
  providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class ChoreDropdownBoard {
  constructor(config: NgbDropdownConfig) {
    // customize default values of dropdowns used by this component tree
    config.up = false;
    config.autoClose = true;
  }
}