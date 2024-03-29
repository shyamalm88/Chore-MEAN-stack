import { Component, ViewEncapsulation, OnInit, Input, ViewChild, NgZone } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { NgbModal, ModalDismissReasons, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Constant } from '../../../../common/constant/constant';
import { HttpService } from '../../../../common/services/http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Response } from '@angular/http';
import * as io from 'socket.io-client';


@Component({
  selector: 'chore-portlet',
  templateUrl: './portlet.component.html',
  encapsulation: ViewEncapsulation.None,
})

export class PortletComponent implements OnInit {

  @Input() board: any;
  @ViewChild(NgbDropdown)
  private dropdown: NgbDropdown;

  public socket = io('http://localhost:8080/');
  private date;
  private changeCardName;
  private dueDateForm;
  private diffDays;
  private portletData;
  private boardIndex;
  private portletDataArray;
  public updatePortletForm;
  public cardCreateForm;
  private cardNamePrevValue;
  private viewName;

  constructor(
    private dragulaService: DragulaService,
    private modalService: NgbModal,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private zone: NgZone,

  ) {

    dragulaService.drag.subscribe((value) => {
      // console.log(value);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      const movedCardId = value[1].dataset.cardId;
      const movedFromPortletId = value[1].dataset.portletId;
      const movedIntoPortletId = value[1].parentElement.dataset.portletId;

      const url = Constant.API_ENDPOINT + 'move/' + movedCardId + '/' + movedFromPortletId + '/' + movedIntoPortletId;

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
    let self = this;
    this.socket.on('connect', function () {
      //console.log('connect');
    });
    this.socket.on('getCardDetails', function (data) {
      self.getAllPortlets();
    });

    this.dueDateForm = this.fb.group({
      duedate: ['']
    });

    this.changeCardName = this.fb.group({
      cardName: ['', Validators.required]
    });
  }

  onDateChange(portletCardDueDate) {
    console.log(portletCardDueDate)
    let year; let month; let day;
    if (portletCardDueDate) {
      if (typeof (portletCardDueDate) === 'object' && portletCardDueDate !== null) {
        year = parseInt(portletCardDueDate.year, 10);
        month = parseInt(portletCardDueDate.month, 10) - 1;
        day = parseInt(portletCardDueDate.day, 10);
        this.date = new Date(year, month, day);
        console.log(this.date)
      } else {
        const date = portletCardDueDate;
        this.date = date;
        console.log(this.date)
      }
      this.date = new Date(this.date);
      const timeDiff = this.date.getTime() - new Date().getTime();
      this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
  }

  showNameForm(cardName) {
    this.viewName = true;
    this.cardNamePrevValue = cardName
    console.log(this.cardNamePrevValue)
  }

  hideNameForm(portletId) {
    console.log(portletId);
    if (this.changeCardName.valid) {
        this.httpService.editData(Constant.API_ENDPOINT + 'edit/portlet/' + portletId + '/edit', this.changeCardName.value)
            .subscribe(
            (response): void => {
                this.portletData = response;
                console.log(this.portletData);
                this.portletDataArray = this.portletData.board.portlet;
                this.socket.emit('updateCard', 'message');
            }
            );
    } else {
      this.changeCardName.controls['cardName'].setValue(this.cardNamePrevValue);
    }
    this.viewName = false;

  }


  /**
   * this function is used for updating
   * view from child update
   * @param responseFromChild
   */
  portletUpdate(responseFromChild) {
    this.portletDataArray = responseFromChild;
    this.socket.emit('updateCard', 'message');
  }

  cardUpdate(responsefromCardChild) {
    this.portletDataArray = responsefromCardChild;
    this.socket.emit('updateCard', 'message');
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
          this.socket.emit('updateCard', 'message');
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
          this.socket.emit('updateCard', 'message');
        }
        );
    }
  }



  hideme(item) {
    item.hideme = !item.hideme;
  }

  //modal open
  openModal(content) {
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



