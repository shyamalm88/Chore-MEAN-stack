import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { HttpService } from '../common/services/http.service';
import { Subscription } from 'rxjs/Rx';
import { Constant } from '../common/constant/constant';

@Component({
    moduleId: module.id,
    selector: 'chore-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    private social;
    constructor(private router: Router, private route: ActivatedRoute, private httpService: HttpService) { }

    ngOnInit() { }


}
