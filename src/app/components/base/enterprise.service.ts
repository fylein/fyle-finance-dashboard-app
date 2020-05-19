import { Injectable } from '@angular/core';
import { GeneralService } from './general.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private generalService: GeneralService) { }

  mapUser(profile) {
    return this.generalService.post('/enterprises/add_user/', profile)
  }
  
  getOrgs(enterprise_id): Observable<any> {
    return this.generalService.get(`/enterprises/${enterprise_id}/orgs/`, {});
  }

  getExportLogs(enterprise_id): Observable<any> {
    return this.generalService.get(`/enterprises/${enterprise_id}/exports/`, {});
  }

  postExportLogs(enterprise_id) {
    return this.generalService.post(`/enterprises/${enterprise_id}/exports/`, {});
  }
}
