import { Component, ViewEncapsulation, ElementRef} from "@angular/core";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
    moduleId: module.id,
  selector: 'chore-portlet-modal',
  templateUrl: './portletmodal.component.html'
})
export class PortletModalComponent { 
    constructor(private modalService: NgbModal) {}
    close(){
        
    }
}