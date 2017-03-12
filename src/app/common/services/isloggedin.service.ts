import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class IsLoggedInService {
    public loggedInUserData = JSON.parse(localStorage.getItem('currentUser'));
    public isLoggedIn;
    constructor(private router: Router) {
        if (this.loggedInUserData) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    }




}