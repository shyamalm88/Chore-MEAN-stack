import { Component, ViewEncapsulation, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from '../../../../common/services/http.service';
import { Subscription } from 'rxjs/Rx';
import { Constant } from '../../../../common/constant/constant';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import * as io from 'socket.io-client';

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
    public socket = io('http://localhost:8080/');
    public boardDisplayData;
    private success;
    private error;
    private dataSet;
    private teamSet;
    private selectedValue;
    public updateBoardForm: FormGroup;
    private fileName;
    private imageUploadDisplay: Boolean = false;
    private imageDisplay: Boolean = true;
    private coverImageUrl;
    private BoardUID;
    private name;
    private deleteName;
    public deleteBoard;
    uploadFile: any; // uploadFile
    postId: number; // postId assign for the cover image post
    options: Object = {
        url: '/api/imageUpload',  // upload url for temporary usage
        fieldName: 'cover', // field name for uploading image.
        params: { 'post_id': this.postId } // postID
    };

    @Input() displayData: any;
    @Output() boardUpdate = new EventEmitter();


    /**
     * =============================================
     * Form builder
     * =============================================
     */

    constructor(
        private modalService: NgbModal,
        private httpService: HttpService,
        public fb: FormBuilder,
        private router: Router,
    ) { }

    /**
     * =============================================
     *On ngOnInit method the api/board is called with get method
     *and the data passed to the SharedDataService.
     * =============================================
     */
    ngOnInit() {
        this.getAllTeams();
        this.imageDisplay = true;
        this.imageUploadDisplay = false;
        this.deleteBoard = this.fb.group({
            deleteBoardName: ['', Validators.required],
        });
    }


    onSelected(value: boolean) {
        //console.log(value);
        this.selectedValue = value;
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

    /**
     * =============================================
     *On updateBoard method will update the board from the modal form
     * which will update the single data whose id matched with the board
     * =============================================
     */

    updateBoard(event, modal) {
        let data = this.updateBoardForm.value;  // accessing form data.
        if (data.name) { // if name entered in the form
            this.httpService.editData(Constant.API_ENDPOINT + 'board/' + data.id, data)
                .subscribe(
                (data): void => {
                    this.boardDisplayData = data;
                    this.dismissModal(modal); // dismissing modal
                    this.showSuccessMessage(); // creating success message
                    ////console.log(this.boardDisplayData);
                },
                (err): void => { //error catching method
                    this.showErrorMessage(); //show error message
                    //console.log(err)
                },
            );
        } else {
            return false;
        }
    }

    deleteImage(event, boardID, coverImageID, boardData) {
        event.preventDefault();
        boardData.coverImageUrl = '';
        boardData.coverImageID = '';
        this.BoardUID = boardID;
        this.httpService.deleteImage(Constant.API_ENDPOINT + 'deleteImage/' + boardID + '/' + coverImageID, boardData)
            .subscribe(
            (response): void => {
                this.boardDisplayData = response;
                if (this.boardDisplayData.message === 'Successfully updated the board') {
                    this.imageDisplay = false; // for removing the image section
                    this.imageUploadDisplay = true; // for displaying the image upload panel;
                }
            }
            )

    }

    getAllTeams() {
        this.httpService.getData(Constant.API_ENDPOINT + 'team')
            .subscribe(
            (data): void => {
                this.teamSet = data;
                //console.log(this.teamSet);
            }
            );
    }

    /**
     * show success message on board creation success
     */

    showSuccessMessage(): void {
        this.success = this.boardDisplayData.message;
        //console.log(this.success);
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

        this.router.navigate(['/chore/c/' + this.boardDisplayData.board.boardId + '/' + this.boardDisplayData.board.name.replace(/ /g, "_")]);
        setTimeout(function () {
            modal('Cross click');
        }, 1500);

    }

    getPrevValue(name) {
        this.name = name;
    }

    nameUpdate(name) {
        if (name === '' || name === ' ') {
            this.updateBoardForm.controls['name'].setValue(this.name);
        }
    }

    confirmBoardName(boardName) {
        this.deleteName = boardName.toLowerCase();
    }

    delBoard(_id) {
        console.log(_id);
        console.log(this.deleteBoard.value);
        console.log(this.deleteName);
        if ((this.deleteBoard.controls['deleteBoardName'].value).toLowerCase() === this.deleteName) {
            this.httpService.deleteData(Constant.API_ENDPOINT + 'board/' + _id)
                .subscribe(
                (response) => {
                    this.boardUpdate.emit('loadAllData');
                }
                );
        }
    }

    navigateToBoard(id, name) {
        //console.log(id, name);
        this.router.navigate(['/chore/c/' + id + '/' + name.replace(/ /g, "_")]);
    }

    /**
     * open modal method to open the board edit modal
     */

    open(event, content): void {
        event.stopPropagation();
        this.success = undefined;
        this.error = undefined;
        this.updateBoardForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            id: [''],
            teamname: [],
            coverImageUrl: [''],
            boardId: ['', Validators.required]
        });
        this.modalService.open(content);
    }
}
