import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../common/services/http.service';
import { Constant } from '../common/constant/constant';


@Component({

    selector: 'chore-main',
    templateUrl: './main.component.html',
    encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
    private boardId;
    private boardData;
    private boardCoverImage;
    constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.boardId = params['boardid'];
            this.getThisBoardDeatils()
        });
    }

    getThisBoardDeatils() {
        this.httpService.getData(Constant.API_ENDPOINT + 'portlet/' + this.boardId)
            .subscribe(
            (data): void => {
                this.boardData = data;
                this.boardCoverImage = this.boardData.coverImageUrl;
            }
            );
    }
}