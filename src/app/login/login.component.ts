import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpService } from '../common/services/http.service';
import { Subscription } from 'rxjs/Rx';
import { Constant } from '../common/constant/constant';

@Component({

    selector: 'chore-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private social;
    public logInForm: FormGroup;
    public submitted: Boolean;
    public userLoggedIndata;
    private loginSuccessMessage: Boolean;
    private loginUserErrorMessage: Boolean;
    private loginPasswordErrorMessage: Boolean;
    constructor(private router: Router, private route: ActivatedRoute, private httpService: HttpService, private fb: FormBuilder) { }

    ngOnInit() {
        this.logInForm = this.fb.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    login(value, isValid: boolean) {
        this.submitted = true; // set form submit to true
        console.log(this.logInForm.value)
        this.httpService.postData(Constant.ROUTE_ENDPOINT + 'login', this.logInForm.value)
            .subscribe(
            (data): void => {
                this.userLoggedIndata = data;
                console.log(this.userLoggedIndata.message);
                if (this.userLoggedIndata.message === 'successfully logged in') {
                    this.loginSuccessMessage = true;
                    this.loginUserErrorMessage = false;
                    this.loginPasswordErrorMessage = false;
                    let self = this;
                    setTimeout(function () {
                        self.router.navigate(['']);
                    }, 1000);
                } else if (this.userLoggedIndata.message === 'Not a register user') {
                    this.loginUserErrorMessage = true;
                    this.loginPasswordErrorMessage = false;
                } else {
                    this.loginUserErrorMessage = false;
                    this.loginPasswordErrorMessage = true;
                }
            },
            (err): void => { //error catching method
                console.log(err)
            },
        );
    }
}
