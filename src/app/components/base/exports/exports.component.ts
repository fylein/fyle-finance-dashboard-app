import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../enterprise.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const GSHEET_LINK = environment.gsheet_link;
const REPORT_LINK = environment.report_link;
const HELP_LINK = environment.help_link;
const DEFAULT_SYNC_NOW = "Sync now";
const DEFAULT_SYNC_PROGRESS = "Sync is in progress";
const DEFAULT_SYNC_COMPLETE = "Sync Completed";
const DEFAULT_SYNC_EXPORT = "Export";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "June",
"July", "Aug", "Sept", "Oct", "Nov", "Dec"
];
@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ExportsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  logs: any = {};
  isLoading: boolean = true;
  gsheet_link = GSHEET_LINK;
  report_link = REPORT_LINK;
  help_link = HELP_LINK;
  isSyncing: boolean = false;

  constructor(private enterpriseService: EnterpriseService, private router: Router) {
  }

  ngOnInit() {
      this.getExportSheet();
  }

  formatDate(date) {
    var newDate = new Date(date);
    var month = MONTHS[newDate.getMonth()];
    var day = newDate.getDate();
    var year = newDate.getFullYear();

    return month+" "+day+", "+year;
  }

  getExportSheet() {
    this.enterpriseService.getExportLogs(this.user.enterprise.id).subscribe(logs => {
      this.isLoading = false;
      this.isSyncing = false;
      this.logs = logs;
      this.logs.action = DEFAULT_SYNC_NOW;
      if (this.logs.status != DEFAULT_SYNC_COMPLETE) {
        this.isSyncing = true;
      }
    },
    error => {
      if (error.status==403) {
        this.router.navigate(['/enterprise/connections/']);
      }
      this.logs = {
        updated_at: "",
        status : "Not created yet",
        action : DEFAULT_SYNC_EXPORT,
        total_rows: 0,
        gsheet_link: null,
        total_orgs: 0,
      }
    }
    )
  }
  exportSheet() {
    this.logs.status = DEFAULT_SYNC_PROGRESS;
    this.isSyncing = true;
    var result = this.enterpriseService.postExportLogs(this.user.enterprise.id).subscribe(logs => {
      this.getExportSheet();
    },
    error => {
      this.getExportSheet();
    })
  }

}
