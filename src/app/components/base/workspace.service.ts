import { Injectable } from '@angular/core';
import { GeneralService } from './general.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor(private generalService: GeneralService) { }

  getOrgs(enterprise_id): Observable<any> {
    return this.generalService.get('/orgs/'+enterprise_id, {});
  }

  getExportLogs(enterprise_id): Observable<any> {
    return this.generalService.get('/exports/'+enterprise_id, {});
  }

  postExportLogs(enterprise_id) {
    this.generalService.post('/exports/', {id : enterprise_id}).subscribe(
      response => {
        console.log(response)
      }
    );
  }
}
