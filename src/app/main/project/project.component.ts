import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({

    selector: 'chore-project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None
})

export class ProjectComponent implements OnInit {

    @Input() board: any;

    public socket = io('http://localhost:8080/');
    private cardTags;

    constructor() { }

    ngOnInit() {
        let self = this;
        this.socket.on('updateCardModal', function (response) {
            self.board = response.board;
        });
    }


}