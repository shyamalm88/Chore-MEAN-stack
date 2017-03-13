import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'chore-profile',
    templateUrl: './profile.component.html',
    encapsulation: ViewEncapsulation.None
})


export class ChoreProfile implements OnInit {
    public currentUserData;
    public image;
    public userImage;
    public userName;
    constructor(private authService: AuthService) { }

    @Input() user: string;

    ngOnInit() {
        this.currentUserData = this.user;
        this.userImage = this.currentUserData.facebook ? this.currentUserData.facebook.image : this.currentUserData.google.image;
        this.userName = this.currentUserData.facebook ? this.currentUserData.facebook.name : this.currentUserData.google.name;
    }
}

