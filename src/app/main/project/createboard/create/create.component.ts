import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../../../common/services/http.service';
import { Subscription } from 'rxjs/Rx';
import { Constant } from '../../../../common/constant/constant';
import { SharedDataService } from '../../../../common/services/shared.data.services';

@Component({
  moduleId: module.id,
  selector: 'chore-create-board',
  templateUrl: './create.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CreateBoardComponent implements OnInit {
  private boardData;
  private success;
  private error;
  private dataSet;
  constructor(private modalService: NgbModal, private httpService: HttpService, public fb: FormBuilder, private _sharedService: SharedDataService) { }

  ngOnInit() { }

  public createBoardForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  createBoard(event, modal) {
    let data = this.createBoardForm.value;  // accessing form data.
    if (this.createBoardForm.value.name) { // if name entered in the form
      this.httpService.postData(Constant.API_ENDPOINT + 'board', data)
        .subscribe(
        (data): void => {
          this.boardData = data;

          this.getAllData();

          this.dismissModal(modal); // dismissing modal
          this.showSuccessMesssage(); // creating success message
          console.log(this.boardData);
        },
        (err): void => {            //error catching method
          this.showErrorMessage(); //show error message
          console.log(err)
        },
      );
    } else {
      return false;
    }
    this.createBoardForm.reset();
  }

  getAllData() {
    this.httpService.getData(Constant.API_ENDPOINT + 'board')
      .subscribe(
      (data): void => {
        this.dataSet = data;
        this._sharedService.dataArray = [];
        this._sharedService.insertData(this.dataSet);
        console.log(this._sharedService.dataArray);
      }
      )
  }

  showSuccessMesssage(): void {
    this.success = this.boardData.message;
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
    this.modalService.open(content)
  }
}