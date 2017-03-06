import { Component, ViewEncapsulation} from "@angular/core";
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
    moduleId: module.id,
    selector: 'chore-portlet', 
    templateUrl: './portlet.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PortletComponent{
    constructor(private dragulaService: DragulaService, private modalService: NgbModal) {
    dragulaService.setOptions('first-bag', {
      removeOnSpill: true
    });
    dragulaService.drag.subscribe((value) => {
        console.log(value);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
        console.log(value);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
        console.log(value);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
        console.log(value);
      this.onOut(value.slice(1));
    });
    
  }

//modal open
  open(content) {
    this.modalService.open(content)
  }




  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }
  
  
}



