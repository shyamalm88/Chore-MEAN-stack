import { Component, ViewEncapsulation, OnInit, Input, Directive, NgZone } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../../../common/services/http.service';
import { Subscription } from 'rxjs/Rx';
import { Constant } from '../../../../common/constant/constant';
import { AuthService } from '../../../../common/services/auth.service';
import { Router } from '@angular/router';


const URL = 'api/imageUpload';

/**
 * @export
 * @class CreateBoardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'chore-create-board',
  templateUrl: './create.component.html',
  encapsulation: ViewEncapsulation.None,

})
export class CreateBoardComponent implements OnInit {

  private success;
  private error;
  private dataSet;
  private loggedInUserId;
  private loggedInUserEmail;
  private isLoggedIn;
  private loggedInUserData;
  private teamSet;
  public createBoardForm: FormGroup;
  private selectedValue;
  private fileName = 'Please Select a cover image';
  private loggedInUserName;


  uploadFile: any; // uploadFile
  postId: number; // postId assign for the cover image post
  options: Object = {
    url: '/api/imageUpload',  // upload url for temporary usage
    fieldName: 'cover', // field name for uploading image.
    params: { 'post_id': this.postId } // postID
  };


  @Input() boardData: any
  /**
   * Creates an instance of CreateBoardComponent.
   * @param {NgbModal} modalService
   * @param {HttpService} httpService
   * @param {FormBuilder} fb
   * @param {AuthService} authService
   *
   * @memberOf CreateBoardComponent
   */
  constructor(
    private modalService: NgbModal,
    private httpService: HttpService,
    public fb: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.getAllTeams();
    this.dataSet = this.boardData;
    //console.log(this.dataSet);
  }

  onSelected(value: boolean) {
    //console.log(value);
    this.selectedValue = value; // value
  }

  // if image uploaded then response the value
  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      this.fileName = this.uploadFile.originalname;
      //console.log(this.uploadFile);
    }

  }


  createBoard(event, modal) {
    const data = this.createBoardForm.value;  // accessing form data.
    console.log(data);
    if (this.createBoardForm.value.name) { // if name entered in the form
      this.httpService.postData(Constant.API_ENDPOINT + 'board', data)
        .subscribe(
        (response): void => {
          this.boardData = response;
          this.getAllData();  // for getting all board data;
          this.dismissModal(modal); // dismissing modal
          this.showSuccessMessage(); // creating success message
          //console.log(this.boardData);
        },
        (err): void => {            //error catching method
          this.showErrorMessage(); //show error message
          //console.log(err);
        },
      );
    } else {
      return false;
    }
    this.createBoardForm.reset();
  }


  // for getting all board data
  getAllData() {
    this.httpService.getData(Constant.API_ENDPOINT + 'board')
      .subscribe(
      (data): void => {
        this.dataSet = data;
      }
      );
  }

  // for getting all teams.
  getAllTeams() {
    this.httpService.getData(Constant.API_ENDPOINT + 'team')
      .subscribe(
      (data): void => {
        this.teamSet = data;
        //console.log(this.teamSet);
      }
      );
  }

  // show success message
  showSuccessMessage(): void {
    this.success = this.boardData.message;
  }

  // show error message;
  showErrorMessage(): void {
    this.error = 'Something went wrong, Please try later';
  }

  // dismiss the modal
  dismissModal(modal): void {
    this.router.navigate(['/chore/c/' + this.boardData.board.boardId + '/' + this.boardData.board.name.replace(/ /g,"_")]);
    setTimeout(function () {
      modal('Cross click');
    }, 1500);
  }


  // functions after modal open
  open(content): void {
    this.success = undefined; // success set to initial state
    this.error = undefined;  // error set to initial state
    this.getAllTeams(); // get all teams
    this.authService.userData.subscribe((userData) => { // subscribe auth service
      this.loggedInUserData = userData;
      if (this.loggedInUserData) {
        this.isLoggedIn = true;
        if (this.loggedInUserData.facebook) {
          this.loggedInUserEmail = this.loggedInUserData.facebook.email;
          this.loggedInUserName = this.loggedInUserData.facebook.name;
        } else if (this.loggedInUserData.google) {
          this.loggedInUserEmail = this.loggedInUserData.google.email;
          this.loggedInUserName = this.loggedInUserData.google.name;
        } else {
          this.loggedInUserEmail = this.loggedInUserData.local.email;
          this.loggedInUserName = this.loggedInUserData.local.name;
        }

        // create the form group new instance

        this.createBoardForm = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          createdby: [this.loggedInUserEmail, Validators.required],
          createdByName: [this.loggedInUserName, Validators.required],
          isclosed: [''],
          isarchived: [''],
          teamname: ['', Validators.required],
          boardimage: ['']
        });
      }
    });

    // open modal service
    this.modalService.open(content);
  }
}
