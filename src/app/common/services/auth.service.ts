import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs/Rx';

import { HttpService } from '../services/http.service';
import { Constant } from '../constant/constant';

@Injectable()
export class AuthService {
    private currentUserData;
    constructor(private httpService: HttpService, private router: Router) { }

    public isAuthenticated() {
        this.httpService.getData(Constant.ROUTE_ENDPOINT + 'userData')
            .subscribe(
            (data) => {
                this.currentUserData = data;
                console.log(this.currentUserData);
                if (this.currentUserData) {
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUserData));
                } else {
                    localStorage.removeItem('currentUser');
                }
            },
            (err) => {//error catching method
                console.log(err)
            },
        );
    }
}