import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-fyle-callback',
  templateUrl: './fyle-callback.component.html',
  styleUrls: ['./fyle-callback.component.scss']
})

export class FyleCallbackComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private generalService: GeneralService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let enterpriseId: number = params.state;
      let code: string = params.code;
      this.generalService.post(`/enterprises/${enterpriseId}/fyle/connect_fyle/authorization_code/`, {
        code: code
      }).subscribe(response => {
        this.router.navigate(['/enterprise/connections/']);
      },
      error => {
        if (error.status == 404) {
          this.router.navigate(['/error']);
        } else {
          this.router.navigate(['/enterprise/connections/']);
        }
      });
    });
  }

}