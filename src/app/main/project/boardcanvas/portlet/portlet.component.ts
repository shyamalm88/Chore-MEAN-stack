import { Component, ViewEncapsulation, OnInit, Input, ViewChild } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NgbModal, ModalDismissReasons, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Constant } from '../../../../common/constant/constant';
import { HttpService } from '../../../../common/services/http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Response } from '@angular/http';


@Component({

  selector: 'chore-portlet',
  templateUrl: './portlet.component.html',
  encapsulation: ViewEncapsulation.None
})

export class PortletComponent implements OnInit {

  @ViewChild(NgbDropdown)
  private dropdown: NgbDropdown;


  private portletData;
  private boardIndex;
  private portletDataArray;
  public updatePortletForm;

  constructor(
    private dragulaService: DragulaService,
    private modalService: NgbModal,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,

  ) {

    dragulaService.drag.subscribe((value) => {
      //console.log(value);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      //console.log(value);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      //console.log(value);
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      //console.log(value);
      this.onOut(value.slice(1));
    });

    this.updatePortletForm = this.fb.group({
      portletname: ['', Validators.required]
    });

  }



  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.boardIndex = params['boardid'];
    });
    this.getAllPortlets();
  }

  portletUpdate(responseFromChild) {
    this.portletDataArray = responseFromChild;
  }


  getAllPortlets() {
    this.httpService.getData(Constant.API_ENDPOINT + 'portlet/' + this.boardIndex)
      .subscribe(
      (data): void => {
        this.portletData = data;
        this.portletDataArray = this.portletData.portlet;
      }
      );
  }

  addPortlet(index) {
    if (this.updatePortletForm.value.portletname) {
      const data = this.updatePortletForm.value;
      data.boardId = this.boardIndex;
      this.httpService.editData(Constant.API_ENDPOINT + 'portlet/' + this.boardIndex, data)
        .subscribe(
        (response: Response): void => {
          this.portletData = response;
          this.portletDataArray = this.portletData.board.portlet;
          this.updatePortletForm.reset();
          this.dropdown.close();
        }
        );
    }
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



