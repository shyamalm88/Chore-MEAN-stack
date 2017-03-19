import { Component, ViewEncapsulation, OnInit, DoCheck } from '@angular/core';
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

    ngOnInit() {
        this.getAllData();
    }



    getAllData() {
        this.httpService.getData(Constant.API_ENDPOINT + 'team')
            .subscribe(
            (data): void => {
                this.teamData = data;
                this._sharedTeamService.insertData(this.teamData);
                this.teamDisplayData = this._sharedTeamService.dataArray[0];
            }
        )
    }

    ngDoCheck() {
        if (this.teamData !== this._sharedTeamService.dataArray[0]) {
            this.teamDisplayData = this._sharedTeamService.dataArray[0];
        } else {
             this.teamDisplayData = this.teamData;
        }
    }
}