import { Component, ViewEncapsulation, OnInit, OnChanges, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../common/services/http.service';
import { Subscription } from 'rxjs/Rx';
import { Constant } from '../../../../common/constant/constant';

@Component({
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
    private success;
    private error;
    private dataSet;
    private teamSet;
    private selectedValue;
    public updateBoardForm: FormGroup

    @Input() displayData: any
    /**
     * =============================================
     * Form builder
     * =============================================
     */

    constructor(
        private modalService: NgbModal,
        private httpService: HttpService,
        public fb: FormBuilder,
    ) { }

    /**
     * =============================================
     *On ngOnInit method the api/board is called with get method
     *and the data passed to the SharedDataService.
     * =============================================
     */
    ngOnInit() {
        this.getAllTeams();
    }

    onSelected(value: boolean) {
        console.log(value);
        this.selectedValue = value;
    }
    /**
     * =============================================
     *On updateBoard method will update the board from the modal form
     * which will update the single data whose id matched with the board
     * =============================================
     */

    updateBoard(event, modal) {
        let data = this.updateBoardForm.value;  // accessing form data.
        console.log(data);
        if (this.updateBoardForm.value.name) { // if name entered in the form
            this.httpService.editData(Constant.API_ENDPOINT + 'board/' + data.id, data)
                .subscribe(
                (data): void => {
                    this.boardDisplayData = data;
                    console.log(this.boardDisplayData);

                    this.dismissModal(modal); // dismissing modal
                    this.showSuccessMessage(); // creating success message
                    //console.log(this.boardDisplayData);
                },
                (err): void => { //error catching method
                    this.showErrorMessage(); //show error message
                    console.log(err)
                },
            );
        } else {
            return false;
        }
    }

    getAllTeams() {
        this.httpService.getData(Constant.API_ENDPOINT + 'team')
            .subscribe(
            (data): void => {
                this.teamSet = data;
                console.log(this.teamSet);
            }
            );
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
        this.updateBoardForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            id: [''],
            teamname: [],
        });
        this.modalService.open(content);
    }
}
