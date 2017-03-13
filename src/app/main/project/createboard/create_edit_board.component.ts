import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { HttpService } from '../../../common/services/http.service';
import { Constant } from '../../../common/constant/constant';
import { AuthService } from '../../../common/services/auth.service';


@Component({
    moduleId: module.id,
    selector: 'create-edit-board',
    templateUrl: './create_edit_board.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CreateEditBoardComponent implements OnInit {
    private currentUserData;
    constructor(
        private httpService: HttpService,
        private router: Router,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.authService.userData.subscribe((userData) => {
            this.currentUserData = userData;
            //console.log(this.currentUserData);
        });

    }


}

