import { Component, ViewEncapsulation } from "@angular/core";
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({

    selector: 'chore-portlet-card-label-edit',
    templateUrl: './portletcardlabeledit.component.html',
    encapsulation: ViewEncapsulation.None
})
export class PortletCardLabelEditComponent {
    constructor(config: NgbDropdownConfig) {
    // customize default values of dropdowns used by this component tree
    config.autoClose = false;
  }
}