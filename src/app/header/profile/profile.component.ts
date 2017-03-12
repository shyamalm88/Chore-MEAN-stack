import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'chore-profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None
})


export class ChoreProfile implements OnInit{
    private currentUserData;
    constructor(private authService: AuthService){}
    @Input() user;

    ngOnInit(){
        this.authService.userData.subscribe((userData) => {
            this.currentUserData = userData;
            console.log(this.currentUserData);
        });
    }
}

