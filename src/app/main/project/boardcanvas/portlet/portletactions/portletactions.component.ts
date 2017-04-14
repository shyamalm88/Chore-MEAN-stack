import { Component, ViewEncapsulation, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../../../../common/services/http.service';
import { Constant } from '../../../../../common/constant/constant';

@Component({

    selector: 'chore-portlet-actions',
    templateUrl: './portletactions.component.html',
    encapsulation: ViewEncapsulation.None
})

export class PortletActionsComponent implements OnInit {
    private portletId;
    private portletData;
    private portletDataArray;
    constructor(config: NgbDropdownConfig, private httpService: HttpService) {
        // customize default values of dropdowns used by this component tree
        config.up = false;
        config.autoClose = true;
    }

    @Input() portlet: any;
    @Output() portletUpdate = new EventEmitter();

    ngOnInit() {
        this.portletId = this.portlet.portletId
        //console.log(this.portlet);
    }

    deleteCard(event, portletID) {
        event.preventDefault();
        this.httpService.editData(Constant.API_ENDPOINT + 'edit/portlet/' + portletID, this.portletId)
            .subscribe(
            (response): void => {
                this.portletData = response;
                this.portletDataArray = this.portletData.board.portlet;
                this.portletUpdate.emit(this.portletDataArray);
            }
            );
    }
}


