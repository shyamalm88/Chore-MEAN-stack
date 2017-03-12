import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpService } from '../../../common/services/http.service';
import { Constant } from '../../../common/constant/constant';


@Component({
    moduleId: module.id,
    selector: 'create-edit-board',
    templateUrl: './create_edit_board.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CreateEditBoardComponent implements OnInit {
    private currentUserData;
    constructor(private httpService: HttpService, private router: Router) { }

    ngOnInit() {
        this.httpService.getData(Constant.ROUTE_ENDPOINT + 'userData')
            .subscribe(
            (data): void => {
                this.currentUserData = data;
                if (this.currentUserData) {
                    localStorage.setItem('currentUser', JSON.stringify(data));
                }else{
                    this.router.navigate(['login'])
                }
            },
            (err): void => {//error catching method
                console.log(err)
            },
        );

    }


}

