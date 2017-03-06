import { Component, ViewEncapsulation } from "@angular/core";
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'chore-project-name',
    templateUrl: './projectname.component.html',
    encapsulation: ViewEncapsulation.None
})

export class ProjectNameComponent{
   constructor(config: NgbDropdownConfig) {
    // customize default values of dropdowns used by this component tree
    config.autoClose = false;
  }
}