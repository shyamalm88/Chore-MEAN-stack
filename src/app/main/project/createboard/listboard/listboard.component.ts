import { Component, ViewEncapsulation, OnInit, DoCheck, OnChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../../../common/services/http.service';
import { Subscription } from 'rxjs/Rx';
import { Constant } from '../../../../common/constant/constant';
import { SharedDataService } from '../../../../common/services/shared.data.services';

@Component({
    moduleId: module.id,
    selector: 'chore-list-board',
    templateUrl: './listboard.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ListBoardComponent implements OnInit {
    public boardDisplayData;
    private displayData;
    private success;
    private error;
    private dataSet;
    constructor(private modalService: NgbModal, private httpService: HttpService, public fb: FormBuilder, private _sharedService: SharedDataService) { }


    ngOnInit() {
        this.httpService.getData(Constant.API_ENDPOINT + 'board')
            .subscribe(
            (data): void => {
                this.displayData = data;
                this._sharedService.insertData(this.displayData);
                this.boardDisplayData = this._sharedService.dataArray[0];
                console.log(this.boardDisplayData);
            },
            (err): void => {            //error catching method
                console.log(err)
            },
        );
    }

    public updateBoardForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        id: [''],
    });
    updateBoard(event, modal) {
        let data = this.updateBoardForm.value;  // accessing form data.
        if (this.updateBoardForm.value.name) { // if name entered in the form
            this.httpService.editData(Constant.API_ENDPOINT + 'board/' + data.id, data)
                .subscribe(
                (data): void => {
                    this.boardDisplayData = data;

                    //this.getAllData();

                    this.dismissModal(modal); // dismissing modal
                    this.showSuccessMesssage(); // creating success message
                    console.log(this.boardDisplayData);
                },
                (err): void => {            //error catching method
                    this.showErrorMessage(); //show error message
                    console.log(err)
                },
            );
        } else {
            return false;
        }
        console.log(data);
    }

    // getAllData() {
    //     this.httpService.getData(Constant.API_ENDPOINT + 'board')
    //         .subscribe(
    //         (data): void => {
    //             this.dataSet = data;
    //             this._sharedService.dataArray = [];
    //             this._sharedService.insertData(this.dataSet);
    //             console.log(this._sharedService.dataArray);
    //         }
    //         )
    // }

    showSuccessMesssage(): void {
        this.success = this.boardDisplayData.message;
        console.log(this.success)
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

    ngDoCheck() {
        if (this.displayData != this._sharedService.dataArray[0]) {
            this.boardDisplayData = this._sharedService.dataArray[0];
        } else {
            this.boardDisplayData = this.displayData;
        }
    }
}