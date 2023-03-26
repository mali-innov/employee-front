import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private user: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // const currentUser: any = sessionStorage.getItem('USER_INFO');
    // this.user = JSON.parse(currentUser);
    // if (this.user?.roles === 'ADMIN') {
    //   this.router.navigate(['/']);
    // } else if (this.user?.roles === 'EMPLOYEE') {
    //   this.router.navigate(['/employee']);
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

}
