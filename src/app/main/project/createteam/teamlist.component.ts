import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { Constant } from '../../../common/constant/constant';

@Component({
    selector: 'chore-team-list',
    templateUrl: 'teamlist.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TeamListComponent implements OnInit {
    private teamData;
    private teamDisplayData;
    constructor(private httpService: HttpService) { }


    @Input() teamlist: any;


    ngOnInit() {
        this.getAllData();
    }



    getAllData() {
        this.httpService.getData(Constant.API_ENDPOINT + 'team')
            .subscribe(
            (data): void => {
                this.teamlist = data;
            }
        );
    }
}
