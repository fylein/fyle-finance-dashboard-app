import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../workspace.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ExportsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));;
  logs: any = {};
  isLoading: boolean = true;

  constructor(private workspaceService: WorkspaceService, private router: Router) {
  }

  ngOnInit() {
      let pathName = window.location.pathname;
      this.workspaceService.getExportLogs(this.user.enterprise.id).subscribe(logs => {
        this.isLoading = false;
        this.logs = logs;
          this.logs.action = "Sync now"
      },
      error => {
        this.logs = {
          updated_at: "",
          status : "Not created yet",
          action : "Export",
          total_rows: 0,
          gsheet_link: null,
          total_orgs: 0,
          shared_with: null
        }
      }
      )
  }

  exportSheet() {
    var result = this.workspaceService.postExportLogs(this.user.enterprise.id)
    console.log(result)
  }

}
