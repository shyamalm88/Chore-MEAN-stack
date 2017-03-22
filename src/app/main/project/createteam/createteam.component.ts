import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../common/services/http.service';
import { AuthService } from '../../../common/services/auth.service';
import { Constant } from '../../../common/constant/constant';
import { Subject, BehaviorSubject } from 'rxjs/Rx';


@Component({

  selector: 'chore-create-team',
  templateUrl: 'createteam.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CreateTeamComponent implements OnInit {
  private loggedInUserData;
  private isLoggedIn;
  private loggedInUserEmail;
  public createTeamForm;
  private teamData;
  private success;
  private teamDataSet;
  private error;

  constructor(
    private modalService: NgbModal,
    private httpService: HttpService,
    public fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getAllData();
  }

  createTeam(event, modal) {
    let data = this.createTeamForm.value;  // accessing form data.
    if (this.createTeamForm.value.name) { // if name entered in the form
      this.httpService.postData(Constant.API_ENDPOINT + 'team', data)
        .subscribe(
        (data): void => {
          this.teamData = data;
          this.dismissModal(modal); // dismissing modal
          this.showSuccessMessage(); // creating success message
          this.getAllData(); // to get all data;
        },
        (err): void => {            //error catching method
          this.showErrorMessage(); //show error message
          console.log(err);
        },
      );
    } else {
      return false;
    }
    this.createTeamForm.reset();
  }

  getAllData() {
    this.httpService.getData(Constant.API_ENDPOINT + 'team')
      .subscribe(
      (data): void => {
        this.teamDataSet = data;
      }
      );
  }

  showSuccessMessage(): void {
    this.success = this.teamData.message;
  }

  showErrorMessage(): void {
    this.error = 'Something went wrong, Please try later';
  }

  dismissModal(modal): void {
    setTimeout(function () {
      modal('Cross click');
    }, 1500);
  }

  open(content): void {
    this.success = undefined;
    this.error = undefined;
    this.authService.userData.subscribe((userData) => {
      this.loggedInUserData = userData;
      if (this.loggedInUserData) {
        this.isLoggedIn = true;
        if (this.loggedInUserData.facebook) {
          this.loggedInUserEmail = this.loggedInUserData.facebook.email;
        } else if (this.loggedInUserData.google) {
          this.loggedInUserEmail = this.loggedInUserData.google.email;
        } else {
          this.loggedInUserEmail = this.loggedInUserData.local.email;
        }
        this.createTeamForm = this.fb.group({
          name: ['', Validators.required],
          description: ['', Validators.required],
          createdby: [this.loggedInUserEmail, Validators.required],
          members: ['']
        });
      }

    });
    this.modalService.open(content);
  }
}
