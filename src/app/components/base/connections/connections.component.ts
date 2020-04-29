import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../workspace.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.scss']
})
export class ConnectionsComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('user'));;
  orgs: any = {};
  isLoading: boolean = true;

  constructor(private workspaceService: WorkspaceService, private router: Router) {
  }

  ngOnInit() {
      let pathName = window.location.pathname;
      this.workspaceService.getOrgs(this.user.enterprise.id).subscribe(orgs => {
        this.isLoading = false;
        this.orgs = orgs;
        this.router.navigateByUrl(`/workspaces/`);
      })
  }

}
