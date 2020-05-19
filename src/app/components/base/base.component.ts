import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnterpriseService } from './enterprise.service';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));;
  orgs: any = {};
  isLoading: boolean = true;

  constructor(private enterpriseService: EnterpriseService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    let pathName = window.location.pathname;
    this.enterpriseService.mapUser(this.user).subscribe(
      response => {
        this.user.enterprise = response
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoading = false;
        if (pathName === '/enterprise') {
          this.router.navigate(['/enterprise/exports/']);
        }
      },
      error => {
          this.router.navigate(['/error']);
      }
    )
  }
}
