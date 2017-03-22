import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../common/services/http.service';
import { Constant } from '../common/constant/constant';
import { Router } from '@angular/router';


@Component({

    selector: 'chore-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
    public signUpForm: FormGroup;
    public submitted: Boolean;
    private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    private specialCharRegex = /^(?=[a-zA-Z0-9~@#$^*()_+=[\]{}|\\,.?: -]*$)(?!.*[<>'"/;`%])/;
    private userSignupdata;
    private succesMessage: Boolean = false;
    private errorMessage: Boolean = false;
    constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) { }

    ngOnInit() {

        this.signUpForm = this.fb.group({
            firstName: ['', [Validators.required,
            Validators.maxLength(20),
            Validators.minLength(3),
            Validators.pattern(this.specialCharRegex)
            ]],
            lastName: ['', [Validators.required,
            Validators.maxLength(20),
            Validators.minLength(3),
            Validators.pattern(this.specialCharRegex)
            ]],
            user: this.fb.group({
                email: ['', [Validators.required,
                Validators.minLength(3),
                Validators.pattern(this.emailRegex)]],
                password: ['', [Validators.required,
                Validators.minLength(8),
                Validators.maxLength(20),
                Validators.pattern(this.passwordRegex)
                ]]
            })
        });



    }

    signup(value, isValid: boolean) {
        this.submitted = true; // set form submit to true
        this.httpService.postData(Constant.ROUTE_ENDPOINT + 'auth/user', this.signUpForm.value)
            .subscribe(
            (data): void => {
                this.userSignupdata = data;
                if (this.userSignupdata.message === 'Successfully added user') {
                    this.succesMessage = true;
                    this.errorMessage = false;
                    let self = this;
                    setTimeout(function() {
                        self.router.navigate(['login']);
                    }, 1000);
                }else{
                    console.log('problem in signup')
                    this.errorMessage = true;
                }
            },
            (err): void => { //error catching method
                console.log(err)
                this.errorMessage = true;
            },
        );
    }
}