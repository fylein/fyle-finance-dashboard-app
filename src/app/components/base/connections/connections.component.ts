import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../enterprise.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const FYLE_URL = environment.fyle_url;
const FYLE_CLIENT_ID = environment.fyle_client_id;
const APP_URL = environment.app_url;

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));
  orgs: any = {};
  isLoading: boolean = true;

  constructor(private enterpriseService: EnterpriseService, private router: Router) {
  }

  ngOnInit() {
      this.enterpriseService.getOrgs(this.user.enterprise.id).subscribe(orgs => {
        this.isLoading = false;
        this.orgs = orgs.results;
      })

  }

  connectFyle() {
    window.location.href =
      `${FYLE_URL}/app/developers/#/oauth/authorize?client_id=${FYLE_CLIENT_ID}&redirect_uri=${APP_URL}/fyle/callback/&response_type=code&state=${this.user.enterprise.id}`;
  }
}
