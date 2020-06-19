import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from '../enterprise.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { interval, from } from 'rxjs';
import { switchMap, takeWhile } from 'rxjs/operators';

const GOOGLE_SHEETS_LINK = environment.google_sheets_link;
const REPORT_LINK = environment.report_link;
const HELP_LINK = environment.help_link;

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.scss']
})
export class ExportsComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  export_data: any = {};
  isLoading: boolean = true;
  googleSheetsLink = GOOGLE_SHEETS_LINK;
  reportLink = REPORT_LINK;
  helpLink = HELP_LINK;

  constructor(private enterpriseService: EnterpriseService, private router: Router) {
  }

  exportSheet() {
    this.export_data.status = 'IN_PROGRESS';
    this.enterpriseService.postTriggerExport(this.user.enterprise.id).subscribe(logs => {
      this.getExportSheet();
    },
    error => {
      this.getExportSheet();
    });
  }

  getExportSheet() {
    interval(7000).pipe(
      switchMap(() => from(this.enterpriseService.getExport(this.user.enterprise.id))),
      takeWhile((export_data) => export_data.status === 'IN_PROGRESS', true)
    ).subscribe(export_data => {
      this.export_data = export_data;
    },
    error => {
      if (error.status==403) {
        this.router.navigate(['/enterprise/connections/']);
      }
      this.export_data = {
        updated_at: '',
        status : 'Not created yet',
        total_rows: 0,
        google_sheets_link: null,
        total_orgs: 0,
      }
    });
  }

  ngOnInit() {
    this.isLoading = true;
    this.enterpriseService.getExport(this.user.enterprise.id).subscribe(export_data => {
      this.export_data = export_data;
      this.isLoading = false;
    },
    error => {
      if (error.status==403) {
        this.router.navigate(['/enterprise/connections/']);
      }
      this.isLoading = false;
      this.export_data = {
        updated_at: '',
        status : 'Not created yet',
        total_rows: 0,
        google_sheets_link: null,
        total_orgs: 0,
      }
    });
  }
}
