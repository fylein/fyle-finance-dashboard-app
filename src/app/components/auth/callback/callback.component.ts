import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css'],
})
export class CallbackComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthService) {
    if(this.authService.isLoggedIn()){
      router.navigate(['/enterprise']);
    }
    this.route.queryParams.subscribe(params => {
      if (params.code) {
        this.authService.login(params.code).subscribe(
          response => {
            this.authService.setUser(response).subscribe(profile => {
              localStorage.setItem('user', JSON.stringify(profile));
              router.navigate(['/enterprise']);
            });
          },
          error => {
            this.authService.logout();
            this.router.navigate(['auth/login']).then(function() {
              window.location.reload();
            });
          }
        );
      } else if (params.error) {
        this.router.navigate(['auth/login']).then(function() {
          window.location.reload();
        });
      }
    });
  }

  ngOnInit() {}
}
