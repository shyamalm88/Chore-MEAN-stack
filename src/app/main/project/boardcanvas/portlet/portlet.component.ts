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
  encapsulation: ViewEncapsulation.None,
})

export class PortletComponent implements OnInit {

  @ViewChild(NgbDropdown)
  private dropdown: NgbDropdown;


  private portletData;
  private boardIndex;
  private portletDataArray;
  public updatePortletForm;
  public cardCreateForm;

  constructor(
    private dragulaService: DragulaService,
    private modalService: NgbModal,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,

  ) {

    dragulaService.drag.subscribe((value) => {
      // console.log(value);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      const movedCardId = value[1].dataset.cardId;
      const movedFromPortletId = value[1].dataset.portletId;
      const movedIntoPortletId = value[1].parentElement.dataset.portletId;
      var url = Constant.API_ENDPOINT + 'move/' + movedCardId + '/' + movedFromPortletId + '/' + movedIntoPortletId
      this.httpService.editData(url, movedCardId)
        .subscribe(
        (data) => {
          this.portletData = data;
          this.portletDataArray = this.portletData.board.portlet;
        }
        )
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });


    /**
     * for the portlet update form
     */
    this.updatePortletForm = this.fb.group({
      portletname: ['', Validators.required]
    });


    /**
     * for the card create form
     */
    this.cardCreateForm = this.fb.group({
      cardlabel: ['', Validators.required]
    });

  }



  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.boardIndex = params['boardid'];
    });
    this.getAllPortlets();
  }

  /**
   * this function is used for updating
   * view from child update
   * @param responseFromChild
   */
  portletUpdate(responseFromChild) {
    this.portletDataArray = responseFromChild;
  }

  cardUpdate(responsefromCardChild) {
    this.portletDataArray = responsefromCardChild;
  }

  /**
   * get all portlets from database
   */
  getAllPortlets() {
    this.httpService.getData(Constant.API_ENDPOINT + 'portlet/' + this.boardIndex)
      .subscribe(
      (data): void => {
        this.portletData = data;
        this.portletDataArray = this.portletData.portlet;
      }
      );
  }

  /**
   *
   * @param index add portlets into database
   */
  addPortlet(index) {
    if (this.updatePortletForm.value.portletname) {
      const data = this.updatePortletForm.value;
      data.boardId = this.boardIndex;
      this.httpService.editData(Constant.API_ENDPOINT + 'portlet/' + this.boardIndex, data)
        .subscribe(
        (response: Response): void => {
          this.portletData = response;
          this.portletDataArray = this.portletData.board.portlet;
          console.log(this.portletDataArray);
          this.updatePortletForm.reset();
          this.dropdown.close();
        }
        );
    }
  }

  /**
   * this function is for adding cards into database
   */
  addCard(formValue, item) {
    if (formValue.value.cardlabel) {
      const data = formValue.value;
      this.httpService.editData(Constant.API_ENDPOINT + 'add/cards/' + item.portletId, data)
        .subscribe(
        (response): void => {
          this.portletData = response;
          this.portletDataArray = this.portletData.board.portlet;
          formValue.reset();
          this.hideme(item);
        }
        );
    }
  }



  hideme(item) {
    item.hideme = !item.hideme;
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



