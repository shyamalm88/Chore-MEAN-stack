import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({

    selector: 'chore-header',
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None
})


export class HeaderComponent implements OnInit {
    public isLoggedIn;
    public loggedInUserData;
    constructor(private authService: AuthService) {

    }



    ngOnInit() {
        this.authService.userData.subscribe((userData) => {
            this.loggedInUserData = userData;
            ////console.log(this.loggedInUserData);
            if (this.loggedInUserData) {
                this.isLoggedIn = true;
            }
        });
    }


}