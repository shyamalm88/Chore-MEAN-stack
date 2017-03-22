import { Component, ViewEncapsulation } from "@angular/core";
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({

    selector: 'chore-portlet-actions',
    templateUrl: './portletactions.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PortletActionsComponent{
    constructor(config: NgbDropdownConfig) {
    // customize default values of dropdowns used by this component tree
    config.up = false;
    config.autoClose = true;
  }
}


