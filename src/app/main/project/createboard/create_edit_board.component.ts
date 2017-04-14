import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'underscore';
import { Subscription } from 'rxjs/Rx';
import { HttpService } from '../../../common/services/http.service';
import { Constant } from '../../../common/constant/constant';
import { AuthService } from '../../../common/services/auth.service';


@Component({
    selector: 'create-edit-board',
    templateUrl: './create_edit_board.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CreateEditBoardComponent implements OnInit {
    private currentUserData;
    private boardData;
    private grouped = [];

    constructor(
        private httpService: HttpService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.userData.subscribe((userData) => {
            this.currentUserData = userData;

        });
        this.getAllData();
    }

    getAllData() {
        this.httpService.getData(Constant.API_ENDPOINT + 'board')
            .subscribe(
            (data): void => {
                this.boardData = data;
                this.manageAllData();
            }
            );
    }

    manageAllData() {

        this.grouped = _.chain(this.boardData).groupBy("teamname").map(function (boards, teamName) {
            // Optionally remove product_id from each record
            var cleanBoards = _.map(boards, function (it) {
                return _.omit(it, "");
            });

            return {
                teamName: teamName,
                boards: cleanBoards
            };
        }).value();

        //console.log(this.grouped);
    }


}

