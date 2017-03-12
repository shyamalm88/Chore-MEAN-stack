import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { HttpService } from '../../../common/services/http.service';
import { IsLoggedInService } from '../../../common/services/isloggedin.service';
import { Constant } from '../../../common/constant/constant';


@Component({
    moduleId: module.id,
    selector: 'create-edit-board',
    templateUrl: './create_edit_board.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CreateEditBoardComponent implements OnInit {
    private currentUserData;
    constructor(private httpService: HttpService, private router: Router, private isLoggedInService: IsLoggedInService) { }

    ngOnInit() {

        console.log(this.isLoggedInService.isLoggedIn);
        console.log(this.isLoggedInService.loggedInUserData);

    }


}

