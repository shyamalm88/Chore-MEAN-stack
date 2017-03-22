import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';

@Component({

    selector: 'chore-profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None
})


export class ChoreProfile implements OnInit {
    public currentUserData;
    public userImage: String = "";
    public userName: String = "";
    constructor(private authService: AuthService) { }

    @Input() user: string;

    ngOnInit() {
        this.currentUserData = this.user;
        if (this.currentUserData.facebook){
            this.userImage = this.currentUserData.facebook.image;
            this.userName = this.currentUserData.facebook.name;
        }else if (this.currentUserData.google){
            this.userImage = this.currentUserData.google.image;
            this.userName = this.currentUserData.google.name;
        }else {
            this.userImage = this.currentUserData.local.image;
            this.userName = this.currentUserData.local.name;
        }
    }
}

