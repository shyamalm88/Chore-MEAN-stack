import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable, BehaviorSubject, Subject} from 'rxjs/Rx';

import { HttpService } from '../services/http.service';
import { Constant } from '../constant/constant';


/**
 * Behavior Subject is a type of subject,
 * a subject is a special type of observable so
 * you can subscribe to messages like any other observable.
 * ==========================================================
 * public userData: Subject<string> = new BehaviorSubject<string>(null);
 * it is initially null.
 * ==========================================================
 * but in http subscribe this.userData.next(this.currentUserData);
 * assigning the updated value to its next function. so it will be
 * available which service will subscribe it.
 * ===========================================================
 * in this case isLoggedInServie
 */
@Injectable()
export class AuthService {
    public currentUserData;
    public userData: Subject<string> = new BehaviorSubject<string>(null);
    constructor(private httpService: HttpService, private router: Router) {
        this.isAuthenticated();
    }

    public isAuthenticated() {
        this.httpService.getData(Constant.ROUTE_ENDPOINT + 'userData')
            .subscribe(
            (data) => {
                this.currentUserData = data;
                if (this.currentUserData) {
                    this.userData.next(this.currentUserData);
                }else{
                    this.router.navigate(['login']);
                }
            },
            (err) => { //error catching method
                console.error(err)
            },
        )

    }



}

