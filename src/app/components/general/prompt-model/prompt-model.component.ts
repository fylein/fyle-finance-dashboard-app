import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as bootstrap from 'bootstrap';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-prompt-model',
  templateUrl: './prompt-model.component.html',
  styleUrls: ['./prompt-model.component.scss']
})
export class PromptModelComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'))
  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var router = this.router;
    var authService = this.authService;
    if (!this.user.enterprise) {
      $('#enterpriseError').modal('show');
      $('#enterpriseError').on('hidden.bs.modal', function () {
          authService.logout();
          router.navigate(['auth/login']).then(function() {
            window.location.reload();
          });
      });
    } else {
      router.navigate(['enterprise/connections/'])
    }
  }

}
