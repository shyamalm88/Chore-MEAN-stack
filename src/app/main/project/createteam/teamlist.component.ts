import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../common/services/http.service';
import { Constant } from '../../../common/constant/constant';
import { SharedTeamService } from '../../../common/services/shared.data.services';

@Component({
    moduleId: module.id,
    selector: 'chore-team-list',
    templateUrl: 'teamlist.component.html',
    encapsulation: ViewEncapsulation.None
})
export class TeamListComponent implements OnInit {
    private teamData;
    private teamDisplayData;
    constructor(private httpService: HttpService, private _sharedTeamService: SharedTeamService) { }


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
