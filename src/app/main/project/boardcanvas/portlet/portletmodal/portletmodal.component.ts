import { Component, ViewEncapsulation, ElementRef, OnInit, Input, ViewChild, Output, EventEmitter, NgZone } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../../common/services/http.service';
import { Constant } from '../../../../../common/constant/constant';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../../../common/services/auth.service';

@Component({
  selector: 'chore-portlet-modal',
  templateUrl: './portletmodal.component.html'
})
export class PortletModalComponent implements OnInit {

  @Input() card: any;
  @Input() cardIndex;
  @Input() portletIndex;
  @Output() cardUpdate = new EventEmitter();


  private viewLabel: Boolean = true;
  private addDescription: Boolean = false;
  private editLabelForm;
  private editTagLineForm;
  private addTagLineForm;
  private config;
  private cardResponseBoard;
  private addDescriptionForm;
  private diffDays;
  private addDueDateForm;

  private portletCardTagLine: Boolean;
  private portletCardTagLineVisible: Boolean;
  private editAddTagLineVisible: Boolean;
  private date;
  private Counter = 0;
  private loggedInUserData;
  private userImage;
  private userName;
  public addCommentForm;
  private name;

  constructor(private modalService: NgbModal,
    public fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private zone: NgZone
  ) {


    /**
     * CKEditor Configuration
     */
    this.config = {
      toolbar: [
        {
          name: 'basicstyles',
          groups: ['basicstyles', 'cleanup'],
          items: ['Bold', 'Italic', 'Strike', '-', 'RemoveFormat']
        },
        {
          name: 'paragraph',
          items: ['NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
        },
        {
          name: 'links',
          items: ['Link', 'Unlink']
        },
        {
          name: 'editing',
          groups: ['spellchecker'],
          items: ['Scayt']
        },
        { name: 'styles', items: ['Styles', 'Format'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar', '-', 'Source', 'Preview', '-', 'Templates'] },
        {
          name: 'tools',
          items: ['Maximize']
        },
      ]
    };

  }


  ngOnInit() {
    this.authService.userData.subscribe((userData) => {
      this.loggedInUserData = userData;
      if (this.loggedInUserData.facebook) {
        this.userImage = this.loggedInUserData.facebook.image;
        this.userName = this.loggedInUserData.facebook.email;
        this.name = this.loggedInUserData.facebook.name;
      } else if (this.loggedInUserData.google) {
        this.userImage = this.loggedInUserData.google.image;
        this.userName = this.loggedInUserData.google.email;
        this.name = this.loggedInUserData.google.name;
      } else {
        this.userImage = this.loggedInUserData.local.image;
        this.userName = this.loggedInUserData.local.email;
        this.name = this.loggedInUserData.local.name;
      }
    });

    if (this.card.portletCardTagLine) {
      this.portletCardTagLineVisible = true;
    }
    this.addDueDateForm = this.fb.group({
      portletCardDueDate: [this.card.portletCardDueDate, Validators.required]
    });
    this.addCommentForm = this.fb.group({
      portletCardsComments: ['', Validators.required],
      portletCardsCommentsCreator: [this.userName, Validators.required],
      portletCardsCommentsCreatorName: [this.name, Validators.required],
      portletCardsCommentsCreatorImage: [this.userImage, Validators.required],
      portletCardsCommentsCreatedAt: [new Date(), Validators.required]
    });
  }




  /**
   * Modal label Edit function
   */
  editLabel() {
    this.viewLabel = false;
    this.editLabelForm = this.fb.group({
      portletCardName: [this.card.portletCardName, Validators.required],
    });
  }

  addComment(portletCardId) {
    let data = this.addCommentForm.value;
    let id = portletCardId;
    this.httpService.editData(Constant.API_ENDPOINT + 'edit/cards/' + id + '/portletCardsComments', data)
      .subscribe(
      (response): void => {
        console.log(response);
        this.cardResponseBoard = response;
        this.cardResponseBoard = this.cardResponseBoard.board.portlet;
        this.cardUpdate.emit(this.cardResponseBoard);
        this.zone.run(() => { // <== added
          this.card.portletCardsComments = this.cardResponseBoard[this.portletIndex].portletCards[this.cardIndex].portletCardsComments;
        });
        this.addCommentForm.controls['portletCardsComments'].reset();
      }
      )

  }

  /**
   * Modal label save function
   */
  editDoneLabel(portletCardId) {
    this.viewLabel = true;
    let data = this.editLabelForm.value;
    let id = portletCardId;
    console.log(id);
    this.httpService.editData(Constant.API_ENDPOINT + 'edit/cards/' + id + '/portletCardName', data)
      .subscribe(
      (response): void => {
        console.log(response);
        this.cardResponseBoard = response;
        this.cardResponseBoard = this.cardResponseBoard.board.portlet;
        this.cardUpdate.emit(this.cardResponseBoard);
      }
      )
  }

  addTagline() {
    this.editAddTagLineVisible = true;
    this.addTagLineForm = this.fb.group({
      portletCardTagLine: [this.card.portletCardTagLine, Validators.required]
    });
  }

  editDoneTagLine(portletCardId) {
    const data = this.addTagLineForm.value;
    let id = portletCardId;
    this.httpService.editData(Constant.API_ENDPOINT + 'edit/cards/' + id + '/portletCardTagLine', data)
      .subscribe(
      (response): void => {
        console.log(response);
        this.cardResponseBoard = response;
        this.cardResponseBoard = this.cardResponseBoard.board.portlet;
        this.cardUpdate.emit(this.cardResponseBoard);
        this.editAddTagLineVisible = false;
      }
      )
  }

  onChange(portletCardId) {
    let id = portletCardId;
    let year; let month; let day;
    if (this.card.portletCardDueDate) {
      console.log(this.card.portletCardDueDate);
      if (typeof (this.card.portletCardDueDate) === 'object' && this.card.portletCardDueDate !== null) {
        year = parseInt(this.card.portletCardDueDate.year, 10);
        month = parseInt(this.card.portletCardDueDate.month, 10) - 1;
        day = parseInt(this.card.portletCardDueDate.day, 10);
        this.date = new Date(year, month, day);
      } else {
        const date = this.card.portletCardDueDate;
        // console.log(date);
        // year = date.getFullYear();
        // month = date.getMonth();
        // day = date.getDay();
        this.date = date;
      }

      const data = { 'portletCardDueDate': this.date };
      this.date = new Date(this.date);
      const timeDiff = this.date.getTime() - new Date().getTime();
      this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (this.Counter > 0) {
        this.httpService.editData(Constant.API_ENDPOINT + 'edit/cards/' + id + '/portletCardDueDate', data)
          .subscribe(
          (response): void => {
            console.log(response);
            this.cardResponseBoard = response;
            this.cardResponseBoard = this.cardResponseBoard.board.portlet;
            this.cardUpdate.emit(this.cardResponseBoard);
          }
          )
      }
      this.Counter++;

    }


  }

  /**
   * CKEditor value get
   */
  addEditDescriptionValue(portletCardId) {
    console.log(this.addDescriptionForm.value);
    const data = this.addDescriptionForm.value;
    let id = portletCardId;
    if (this.addDescriptionForm.value.portletCardsDescription) {
      this.httpService.editData(Constant.API_ENDPOINT + 'edit/cards/' + id + '/portletCardsDescription', data)
        .subscribe(
        (response): void => {
          console.log(response);
          this.cardResponseBoard = response;
          this.cardResponseBoard = this.cardResponseBoard.board.portlet;
          this.cardUpdate.emit(this.cardResponseBoard);
          this.addDescription = false;
        }
        )
    } else {
      this.addDescription = false;
    }

  }

  /**
   * show Hide CKEditor
   */
  showCKEditor() {
    this.addDescription = !this.addDescription;
    this.addDescriptionForm = this.fb.group({
      portletCardsDescription: [this.card.portletCardsDescription]
    });
  }
}