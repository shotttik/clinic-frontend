import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}
  isCategoriesPage: boolean = false;
  isAdminPage: boolean = false;
  isRegisterPage: boolean = false;
  registerType: string = '';

  ngOnInit(): void {
    this.CheckIsCategoriesPage() ? (this.isCategoriesPage = true) : '';
    if (this.CheckIsRegisterPage()) {
      this.isRegisterPage = true;
      const routeParams = this.route.snapshot.paramMap;
      this.registerType = String(routeParams.get('registerType'));
    }
    this.CheckIsAdminPage() ? (this.isAdminPage = true) : '';
  }

  changePage(url: string) {
    if (url.includes('/admin/register')) {
      this.registerType = url.split('/')[3];
    }
    this.router.navigate([url]);
  }
  CheckIsCategoriesPage(): boolean {
    return this.router.url == '/admin/categories';
  }
  CheckIsAdminPage(): boolean {
    return this.router.url == '/admin';
  }
  CheckIsRegisterPage(): boolean {
    return this.router.url.includes('/admin/register/');
  }
}
