import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../enterprise.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const GSHEET_LINK = environment.gsheet_link;
const REPORT_LINK = environment.report_link;
const HELP_LINK = environment.help_link;
const DEFAULT_SYNC_NOW = "Sync now";
const DEFAULT_SYNC_PROGRESS = "In progress";
const DEFAULT_SYNC_COMPLETE = "Completed";
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
  gsheetLink = GSHEET_LINK;
  reportLink = REPORT_LINK;
  helpLink = HELP_LINK;
  isSyncing: boolean = false;
  disableStatus: boolean = false;

  constructor(private enterpriseService: EnterpriseService, private router: Router) {
  }

  ngOnInit() {
    this.getExportSheet();
  }

  formatDate(date) {
    var newDate = new Date(date);
    var month = MONTHS[newDate.getMonth()];
    var day: any = newDate.getDate();
    var year = newDate.getFullYear();
    var hours: any = newDate.getHours();
    var minutes: any = newDate.getMinutes();

    if (day/10 < 1) {
      day = `0${day}`
    }
    if (hours/10 < 1) {
      hours = `0${hours}`
    }
    if (minutes/10 < 1) {
      minutes= `0${minutes}`
    }
    
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  }

  getExportSheet() {
    this.enterpriseService.getExportLogs(this.user.enterprise.id).subscribe(logs => {
      this.isLoading = false;
      this.isSyncing = false;
      this.logs = logs;
      this.logs.action = DEFAULT_SYNC_NOW;
      if (this.logs.status != DEFAULT_SYNC_COMPLETE) {
        this.isSyncing = true;
        this.disableStatus = true;
        this.logs.action = "Syncing";
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
    this.disableStatus =true;
    this.logs.action = "Syncing";
    var result = this.enterpriseService.postExportLogs(this.user.enterprise.id).subscribe(logs => {
      this.getExportSheet();
    },
    error => {
      this.getExportSheet();
    })
  }

}
