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
/**
 * =============================================
 * List all created board data after creation and
 * which are already created in past.
 * Used a shared service "SharedDataService" to update the list
 * of boards
 * =============================================
 */
export class ListBoardComponent implements OnInit {
    public boardDisplayData;
    private displayData;
    private success;
    private error;
    private dataSet;
/**
 * =============================================
 * Form builder
 * =============================================
 */
    public updateBoardForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        id: [''],
    });
    constructor(
        private modalService: NgbModal,
        private httpService: HttpService,
        public fb: FormBuilder,
        private _sharedService: SharedDataService
    ) { }

/**
 * =============================================
 *On ngOnInit method the api/board is called with get method
 *and the data passed to the SharedDataService.
 * =============================================
 */
    ngOnInit() {
        this.httpService.getData(Constant.API_ENDPOINT + 'board')
            .subscribe(
            (data): void => {
                this.displayData = data;
                this._sharedService.insertData(this.displayData);
                this.boardDisplayData = this._sharedService.dataArray[0];
                console.log(this.boardDisplayData);
            },
            (err): void => {//error catching method
                console.log(err);
            },
        );
    }

/**
 * =============================================
 *On updateBoard method will update the board from the modal form
 * which will update the single data whose id matched with the board
 * =============================================
 */

    updateBoard(event, modal) {
        let data = this.updateBoardForm.value;  // accessing form data.
        if (this.updateBoardForm.value.name) { // if name entered in the form
            this.httpService.editData(Constant.API_ENDPOINT + 'board/' + data.id, data)
                .subscribe(
                (data): void => {
                    this.boardDisplayData = data;
                    this.dismissModal(modal); // dismissing modal
                    this.showSuccessMessage(); // creating success message
                    console.log(this.boardDisplayData);
                },
                (err): void => { //error catching method
                    this.showErrorMessage(); //show error message
                    console.log(err)
                },
            );
        } else {
            return false;
        }
        console.log(data);
    }

    /**
     * show success message on board creation success
     */

    showSuccessMessage(): void {
        this.success = this.boardDisplayData.message;
        console.log(this.success);
    }

    /**
     * show error message on board creation error
     */

    showErrorMessage(): void {
        this.error = 'Something went wrong, Please try later';
    }

    /**
     * dismiss or close the modal which consist of the update board form
     */

    dismissModal(modal): void {
        setTimeout(function () {
            modal('Cross click');
        }, 1500);
    }

    /**
     * open modal method to open the board edit modal
     */

    open(content): void {
        this.success = undefined;
        this.error = undefined;
        this.modalService.open(content);
    }

    /**
     * check if a new board is added or not. if added then it
     * will repopulate the list of boards view
     */

    ngDoCheck() {
        if (this.displayData !== this._sharedService.dataArray[0]) {
            this.boardDisplayData = this._sharedService.dataArray[0];
        } else {
            this.boardDisplayData = this.displayData;
        }
    }
}