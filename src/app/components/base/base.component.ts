import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceService } from './workspace.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css'],
})
export class BaseComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));;
  orgs: any = {};
  isLoading: boolean = true;

  constructor(private workspaceService: WorkspaceService, private router: Router) {
  }

  ngOnInit() {
    this.isLoading = false;
  }
}
