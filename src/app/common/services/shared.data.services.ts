import {Injectable} from '@angular/core';

@Injectable()
export class SharedDataService {
    dataArray: any[] = [];

    insertData(data: string){
        this.dataArray.unshift(data);
    }
}

export class SharedTeamService {
    dataArray: any[] = [];

    insertData(data: string){
        this.dataArray.unshift(data);
    }
}